+++
title = 'planning intro'
date = 2025-12-12T14:45:04+01:00
draft = false
tags = ['planning', 'ai']
+++

# planning notes: offline vs online, and why deductive planning is cool

i recently started studying planning at college.
i did not expect it to feel this close to the way i think about programming: specify what you want, specify what operations are allowed, then search for a sequence that makes the world look like the goal.

in this post i just want to write down the basics that helped me orient myself.

## what i mean by planning

in classical ai planning you usually have:

- a set of **states** (facts that are true right now)
- a set of **actions/operators** with preconditions and effects
- an **initial state** $s_0$
- a **goal** $g$ (often a conjunction of predicates)

planning is the problem of finding a plan (a sequence, or sometimes a partial order) of actions that transforms $s_0$ into a state that satisfies $g$.

## offline vs online planning

this distinction is simple but important.

**offline planning** (also called deliberative planning):

- you compute a plan before acting
- you assume the model is reliable (or at least stable)
- you execute the plan more or less as computed

it is a good fit when actions are predictable and you can afford thinking time.

**online planning** (planning while acting):

- you interleave planning and execution
- you re-plan when the world surprises you (or you only plan a short horizon)

it is a good fit when the environment changes, sensing matters, or the model is incomplete.

for me the interesting part is that both styles are the same idea, just with a different control loop.

## two formulations i keep seeing: green vs kowalski

different sources present planning in different “shapes”. two that pop up a lot are:

**green formulation** (planning as theorem proving):

- you encode actions and change in logic
- planning becomes: prove that the goal is reachable from the initial facts
- a proof corresponds to a plan (the constructive part)

it frames planning as a logical derivation problem.

**kowalski formulation** (planning as logic + control):

- “algorithm = logic + control”
- you still have a declarative part (rules describing the world)
- but you make explicit the strategy that drives the search (which subgoal first, how to backtrack, what to prefer)

in practice this matches what you actually do when you implement a planner: the domain model is one thing, but search control is where everything becomes feasible or infeasible.

## deductive planning (the part i like the most)

deductive planning is the view where building a plan is like building a proof: you start from a goal, and you keep reducing it into subgoals until everything is supported by the initial facts.

one very concrete way to see this is **partial-order planning** (also called non-linear planning):

- you do not commit immediately to a total sequence
- you maintain a set of actions, ordering constraints, and causal links
- you refine the plan by resolving open preconditions
- you also have to detect and resolve threats

### tiny blocks world example

i’ll use the classic blocks world because it makes the mechanics obvious.

predicates (informal):

- `on(x, y)`: block $x$ is on block $y$
- `ontable(x)`, `clear(x)`, `holding(x)`, `handempty`

actions (strips-like skeleton):

- `pickup(x)`
	- pre: `handempty ∧ clear(x) ∧ ontable(x)`
	- eff: `holding(x) ∧ ¬handempty ∧ ¬ontable(x)`

- `stack(x, y)`
	- pre: `holding(x) ∧ clear(y)`
	- eff: `on(x, y) ∧ handempty ∧ clear(x) ∧ ¬holding(x) ∧ ¬clear(y)`

(i am not trying to be perfectly formal here, i just want enough to follow the refinement steps.)

assume a goal like:

$$g = on(b, c) \wedge on(c, a)$$

and an initial state where, among other facts, $b$ is on the table and $c$ is clear.

### plan refinement, step by step

start with a minimal plan with two dummy actions:

- `start`: its effects represent the initial facts
- `stop`: its preconditions represent the goal facts

then iteratively:

#### 1st step: support `on(b, c)`

- select an open precondition from the goal: `on(b, c)`
- choose an action whose effect achieves it: `stack(b, c)`
- add ordering: `start < stack(b, c) < stop`
- add causal link: ⟨`stack(b, c)`, `on(b, c)`, `stop`⟩

#### 2nd step: support `on(c, a)`

- same idea for `on(c, a)`
- choose `stack(c, a)`
- add ordering and the causal link into `stop`

now the plan has two real actions, but each of them introduces new open preconditions.

#### 3rd step: support `holding(b)` for `stack(b, c)`

`stack(b, c)` needs `holding(b)`.

- select open precondition: `holding(b)`
- actions that can achieve it include `pickup(b)` (or `unstack(b, y)`)
- if the initial state says `ontable(b)`, then `pickup(b)` is the reasonable choice
- add ordering: `start < pickup(b) < stack(b, c)`
- add causal link: ⟨`pickup(b)`, `holding(b)`, `stack(b, c)`⟩

at this point you check if the preconditions of `pickup(b)` are already supported by `start`.
if they are, you add the corresponding causal links from `start`.

#### 4th step: do the same for the other branch

repeat the same idea for `stack(c, a)` (it will need `holding(c)` and `clear(a)`), inserting the actions that make those preconditions true.

### threats: when planning becomes interesting

this is where the planner stops feeling like a clean proof and starts feeling like real search.

a typical threat pattern is:

- you have a causal link ⟨`a`, `p`, `b`⟩ meaning “action `a` establishes `p` for action `b`”
- some other action `t` might negate `p`
- and `t` could be ordered between `a` and `b`

then you must resolve the threat, usually by adding ordering constraints.

one concrete example:

- `pickup(b)` makes `¬handempty`
- but `pickup(a)` needs `handempty`

so if you want both in the plan, you need to order them through an action that restores `handempty` (like stacking/putting down something) or constrain the ordering so the required conditions are preserved.

and sometimes you discover something worse: a choice you made early makes a later subgoal impossible, and ordering constraints cannot fix it.
then you have to backtrack and change the plan structure.

this is why i find deductive planning interesting: you are not just picking actions, you are building a consistent web of commitments.

## small closing thought

for now i’m mostly trying to get comfortable with the basic mental model: goals, preconditions, effects, refinement, threats.
even in toy domains, it is a nice reminder that “figuring out what to do” can be treated as a first-class computational problem.


