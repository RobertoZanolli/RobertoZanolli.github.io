+++
title = 'relax'
date = 2025-11-27T22:15:30+01:00
draft = true
tags = ["personal", "memes", "travel", "scheduling"]

+++



# time to recharge

after weeks of intense work, it's time to take a step back and relax.

sometimes, the best way to recharge is to disconnect and enjoy the simple pleasures of life. whether it's reading a good book, or simply spending time with loved ones.

## a new chapter begins

the past few months have been transformative. 
i successfully defended my thesis and earned my bachelor's degree, which felt like closing one chapter and immediately opening another. without much pause, i dove straight into my master's degree in AI while continuing to work. it's hard to balance both, but the passion for what i'm learning keeps me motivated.

## barcelona: a well-deserved break

after all the hard work, angelica (my beautyful gf <3) and i decided to reward ourselves with a short vacation to barcelona. we both completed our bachelor degrees, so it felt like the perfect moment to celebrate together.

 we spent our days wandering through the streets of barca, starting from la boqueria where we tackled dangerous amounts of jamón ibérico and tapas.
  we made sure to see everything the city had to offer.
  in my opinion park güell is one of the most beautiful places i've ever been to, with both the nature and the colors blending perfectly.

one night we went to opium club and we could go without proper preparation.
![chilling-time](/blog/images/bell-pepper.jpg)
*yeah she's eating a bell pepper*



## a nerdy interlude about cpu scheduling

since my girl is currently studying operating systems in her master's program, we ended up having some curious conversations about cpu scheduling algorithms inside a starbucks (i don't even remember how, wtf?).

for those curious, here's a quick overview of some fundamental scheduling algorithms:

>**round robin (rr)**: this is a preemptive scheduling algorithm where each process gets a fixed time slice (quantum) to execute. when the time quantum expires, the process is moved to the back of the ready queue, and the next process gets its turn. it's fair and prevents any single process from monopolizing the cpu, but choosing the right quantum size is crucial—too small and you waste time on context switching, too large and it behaves like first come first served.

>**first come first served (fcfs)**: the simplest scheduling algorithm. processes are executed in the order they arrive in the ready queue. while easy to implement, it can suffer from the "convoy effect" where short processes wait behind long ones, leading to poor average waiting times.

>**shortest job first (sjf)**: this algorithm selects the process with the shortest expected execution time. it's optimal for minimizing average waiting time, but it has a significant problem: 
**starvation**. long processes might wait indefinitely if shorter processes keep arriving. it's also difficult to predict execution times accurately in practice.

### it's not all talks
if someone ever tells you that studyng cpu scheduling is useless, just think that we experienced its effects the very next day during our shower to decide whou could use the airdyer first.

since she has very long hair she takes a lot longer than me (i barely use the towel and in 3 minutes im done).
she wanted to go first but i explained to her (in a **kind and loving way**) using the following reasoning:
- if she goes first, she will take 30 minutes to dry her hair, so she will wait 0 minutes and i will wait 30 minutes.
this results in a mean wait time of 15 minutes.
- if i go first, i will take 3 minutes to dry my hair, so i will wait 0 minutes and she will wait 3 minutes.
this results in a mean wait time of 1.5 minutes.
therefore, by applying the sjf algorithm, we minimize our average waiting time and both get to enjoy dry hair faster (response time its the same we just have less MWT).


## back to reality

the vacation was exactly what we needed. recharged and motivated, i'm back to juggling work and my AI master's degree. the journey continues, and i'm excited about what's ahead.

sometimes you just need to step away, eat some good food, dance a little, and come back ready to tackle the next challenge.