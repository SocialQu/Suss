// npx ts-node cluster-summary

const kmeans = require('ml-kmeans');

let data = [[1, 1, 1], [1, 2, 1], [-1, -1, -1], [-1, -1, -1.5]];

let ans = kmeans(data, 2);
console.log(ans);

