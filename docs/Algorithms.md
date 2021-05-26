# Algorithm 🐲

## Summarization 🌅

1. Tokenize the audio by sentences.

2. 🎯 Target by default 5 - 10% of the full meeting.

3. Select the number of clusters based on the meeting's length.

4. Segment the meeting by time ⏳ periods and select sentences equitably for each cluster.

5. Join both the most representative sentences by clusters and time periods.

6. Provide headings 🗣️ for each segment of the meeting.


## KPIs 🚇

### Positivity 📯

1. Import TensorflowJS model.

2. Return value from 0 to 💯


### Diversity ⚔️

1. Collect data from videos, podcast and blogs.

2. 🖥️ Compute the average, maximum and minimum diversity in views.

3. Compare the meeting's diversity against the probability distribution.

4. Reward the meeting's that fall 🥮 at the middle.


### Agreeement 🤝

1. Segment the meeting in N segments (use a dictionary).

2. For each segment compute the average distance between sentences.

3. Use a line chart 📉 to show the progression of agreement with respect to time.

4. Smooth and style the line. 🎨


### Change ♻️

1. Reuse the sentences dataset to find the average shift in views from start to finish.

2. Segment the meeting and find the average 🏣 position through time.

3. Perform linear regression to compute the average starting and ending point.

4. Find 🔬 the relative distance of the meeting's starting to were it ended with respect to the training dataset.

