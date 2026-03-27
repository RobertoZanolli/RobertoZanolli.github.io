+++
title = 'building a neural network from scratch with keras'
date = 2026-03-27T20:07:00+01:00
draft = false
tags = ["ml", "deep learning", "keras", "neural networks", "python"]
+++

# building a neural network from scratch with keras

after learning about decision trees and classical ml methods, i wanted to go deeper. neural networks always sounded intimidating, but once you break them down, the core idea is surprisingly elegant: a bunch of simple mathematical operations chained together, and somehow they learn to recognize patterns.

this post is my attempt at building one from scratch (well, from keras) to classify handwritten digits using the famous mnist dataset. no fluff, just the essentials.

## what even is a neural network

a neural network is a function approximator. you give it inputs, it transforms them through a series of layers, and it produces outputs. the magic is in how it **learns** which transformations to apply.

the basic building block is the **neuron** (or unit). a neuron takes inputs, multiplies them by weights, adds a bias, and passes the result through an activation function:

$$z = \sum_{i} w_i x_i + b$$

$$a = f(z)$$

where $w_i$ are the weights, $b$ is the bias, and $f$ is the activation function.

stack a bunch of these neurons together in layers, connect the layers, and you have a neural network.

## the mnist dataset

mnist is the "hello world" of deep learning. it contains 70,000 grayscale images of handwritten digits (0-9), each 28x28 pixels. the goal: given an image, predict which digit it represents.

it's perfect for learning because:
- the inputs are small (28x28 = 784 pixels)
- the task is well-defined (10 classes)
- it's already cleaned and normalized

## activation functions: the nonlinear magic

without activation functions, a neural network would just be a linear model, no matter how many layers you stack. the activation is what introduces **nonlinearity**, allowing the network to learn complex patterns.

the two we'll use:

**relu** (rectified linear unit):

$$f(x) = \max(0, x)$$

simple, fast, and works incredibly well for hidden layers. if the input is negative, it outputs 0. otherwise, it passes the input through unchanged.

**softmax** (for the output layer):

$$\sigma(z_i) = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$

softmax converts raw scores (logits) into probabilities that sum to 1. perfect for multi-class classification.

## loss function: how wrong are we

to learn, the network needs a measure of how wrong its predictions are. for classification, the standard choice is **categorical cross-entropy**:

$$L = -\sum_{c=1}^{C} y_c \log(\hat{y}_c)$$

where $y_c$ is the true label (one-hot encoded) and $\hat{y}_c$ is the predicted probability for class $c$.

the lower the loss, the closer the predictions are to the true labels. the training process (backpropagation + gradient descent) adjusts the weights to minimize this loss over time.

## building it with keras

enough theory, let's write some code. we'll use **tensorflow/keras** because it makes building neural networks almost trivial while still letting you understand what's happening.

### step 1: imports and data loading

```python
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.utils import to_categorical

# load the data (already split into train/test)
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# normalize pixel values to [0, 1]
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# one-hot encode the labels
y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)
```

normalization matters because neural networks work better with small input values. dividing by 255 (the max pixel value) maps everything to the [0, 1] range.

one-hot encoding turns a label like `3` into `[0, 0, 0, 1, 0, 0, 0, 0, 0, 0]`. this is what softmax expects to compare against.

### step 2: define the model

```python
model = Sequential([
    Flatten(input_shape=(28, 28)),  # 28x28 image -> 784 flat vector
    Dense(128, activation="relu"),  # hidden layer: 128 neurons
    Dense(64, activation="relu"),   # hidden layer: 64 neurons
    Dense(10, activation="softmax") # output layer: 10 classes
])
```

here's what each layer does:

- **flatten**: converts the 2d image (28x28) into a 1d vector (784). this is needed because dense layers expect flat input.
- **dense(128, relu)**: a fully connected layer with 128 neurons. each neuron connects to all 784 inputs. relu keeps things nonlinear.
- **dense(64, relu)**: a second hidden layer with 64 neurons. this progressively compresses the representation.
- **dense(10, softmax)**: the output layer. 10 neurons, one per digit. softmax gives us a probability distribution.

### step 3: compile and train

```python
model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)
```

a few notes on the choices:

- **adam** optimizer: an adaptive learning rate optimizer. it's the go-to default because it just works well out of the box.
- **batch_size=32**: the network processes 32 images at a time before updating weights. smaller batches = more updates = potentially faster learning.
- **validation_split=0.2**: reserves 20% of training data to monitor performance on unseen data during training.

### step 4: evaluate and visualize

```python
# evaluate on test set
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f"test accuracy: {test_acc:.4f}")

# plot training history
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history["accuracy"], label="train accuracy")
plt.plot(history.history["val_accuracy"], label="val accuracy")
plt.xlabel("epoch")
plt.ylabel("accuracy")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history["loss"], label="train loss")
plt.plot(history.history["val_loss"], label="val loss")
plt.xlabel("epoch")
plt.ylabel("loss")
plt.legend()

plt.tight_layout()
plt.savefig("training_curves.png", dpi=150)
plt.show()
```

you should expect around **97-98% accuracy** on the test set with this simple architecture. not bad for a few lines of code.

### step 5: make predictions

```python
# predict on a single image
predictions = model.predict(x_test)

# show a few predictions
for i in range(5):
    predicted_label = np.argmax(predictions[i])
    true_label = np.argmax(y_test[i])
    print(f"predicted: {predicted_label}, actual: {true_label}")
```

## what i learned

building this network taught me a few things:

- neural networks are not black magic. each layer does something simple (multiply, add, activate), and the complexity comes from stacking many of them together.
- keras makes the implementation almost trivial, but understanding what each piece does is what makes the difference between "it works" and "i know why it works".
- the architecture choices (number of layers, neurons, activation functions) are where the art is. this simple network works well for mnist, but more complex tasks need more thoughtful design.

this is just the beginning. next steps would be convolutional layers (cnns) for image tasks, which learn spatial patterns instead of treating every pixel independently. but that's a post for another day.
