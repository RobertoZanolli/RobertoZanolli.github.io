+++
title = 'machine learning introduction'
date = 2025-10-28T13:21:28+02:00
draft = true
+++

# decision trees and classification basics

from the dirst lessons of my machine learning course, here are some key concepts about decision trees and classification methods.
between all the interesting subjects in this master, for now, ml seems to be my favorite.
## decision trees: the fundamentals

decision trees work by recursively splitting data based on attribute values. the key question is: which attribute should we test first?

this is where **information gain (IG)** comes in. it measures how much a split reduces uncertainty about the class label.

### entropy and information gain

entropy measures the impurity of a dataset:

$$H(c) = -\sum_{j} p_j \log_2(p_j)$$

where \( p_j \) is the probability of class \( j \).

information gain is the reduction in entropy after splitting on attribute \( d \) with threshold \( t \):

$$IG(c|d:t) = H(c) - H(c|d:t)$$

the attribute with maximum IG gets chosen for splitting.

## quick sklearn example

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

# load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# train decision tree
model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

# evaluate
accuracy = model.score(X_test, y_test)
print(f"accuracy: {accuracy:.2f}")
```

## key hyperparameters

- `max_depth`: controls tree depth to prevent overfitting
- `min_samples_split`: minimum samples required to split a node
- `criterion`: "gini" or "entropy" for measuring split quality

## classification basics

for multi-class problems, you have two main strategies:

- **one-vs-rest (ovr)**: train \( C \) binary classifiers (one per class)
- **one-vs-one (ovo)**: train \( C \times (C-1)/2 \) classifiers (one per pair)

## full notes and code

i'm posting all my detailed notes, formulas, and code examples in my github repo:

https://github.com/RobertoZanolli/ML_DataMining-25-26

you'll find markdown files covering decision trees, entropy calculations, cross-validation strategies, ensemble methods, and more.

these are my study notes from the artificial intelligence master's program. feel free to use them if they help!

