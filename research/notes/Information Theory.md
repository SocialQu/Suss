# Information Theory

The basic intuition behind information theory is that learning that an unlikely event has occurred is more informative than learning that a likely event has occurred

We can calculate the information for flipping a head in Python using the log2() function.

## Entropy ℹ️

The intuition for entropy is that it is the average number of bits required to represent or transmit an event drawn from the probability distribution for the random variable.

The lowest entropy is calculated for a random variable that has a single event with a probability of 1.0, a certainty. The largest entropy for a random variable will be if all events are equally likely.

**Entropy is the number of bits required to represent a randomly drawn even from the distribution, e.g. an average event**

### Examples:
* Skewed Probability Distribution (unsurprising): Low entropy.
* Balanced Probability Distribution (surprising): High entropy.
