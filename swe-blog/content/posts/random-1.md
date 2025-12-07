+++
title = 'how do i feel?'
date = 2025-10-19T00:09:04+02:00
draft = false
tags = ["personal", "ml"]

+++

## i am stressed but happy

just testing the blog system with something random.

the title says it all i am stressed but happy. 

lots to do, but grateful i can do interesting stuff.

 studying for my master's in AI, attending lectures, working at a nice startup, and writing my bachelor's thesis on the side.

### testing code blocks for future posts

here's a simple gradient descent snippet from last lecture notes in python:

```python
import numpy as np

def l(theta):  # noqa: E743
    """
    we assume theta to be a 2-d vector (theta_1, theta_2)
    in form of a numpy array of shape (2,)
    """
    return (theta[0])**2 + (theta[1])**2

def grad_l(theta):  # noqa: E743
    """
    gradient of l
    must return a numpy array of shape (2,)
    """
    return np.array([2 * (theta[0]), 2 * (theta[1])])

def GD(l, grad_l, theta_0, eta, maxit):
    """
    gradient descent algorithm
    inputs:
    - l: function to minimize
    - grad_l: gradient of the function to minimize
    - theta_0: initial point (numpy array of shape (n,))
    - eta: learning rate (float)
    - maxit: maximum number of iterations (int)
    """
    theta = theta_0
    for i in range(maxit):
        theta = theta - eta * grad_l(theta)
    return theta
    
print(GD(l, grad_l, np.array([0.0, 0.0]), 0.5, 1000))
```
