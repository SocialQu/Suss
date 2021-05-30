# PCA Summary

## Algorithm Steps

1. Encode Sentences.
2. Transpose Encoding Matrix.
3. Apply PCA to half the size to get M1.
4. For each vector in M1 find the most similar sentence.
5. Apply algorithm recursively until the desired length is reached.
