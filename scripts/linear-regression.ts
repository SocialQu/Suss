// npx ts-node linear-regression

import embeddings from './data/embeddings.json'
import { Matrix, solve } from 'ml-matrix'
import { getSimilarity } from './utils'


// const x = embeddings.map(({ embeddings }) => embeddings ) as number[][]
// const y = [...Array(embeddings.length)].map((_,i) => [i]) as number[][]

// const ans = solve(x, y).to2DArray()
// console.log('Embeddings Length', x.length, x[0].length)
// console.log('Answer length', ans.length, ans[0].length)

// console.log(x[0].length)
// console.log(ans[0])

// const M = Matrix.multiply(x[0].map(i => [i]), ans).to2DArray()
// console.log('M:', M)


// const m = Matrix.multiply([[0,1,3]], [[0,2,4]]).to2DArray()
// console.log('m:', m)


const X = [[1],[3],[5],[6]]
const Y = [[0],[1],[2],[3]]

const ans = solve(X, Y).to2DArray()
// console.log(ans)


const Z = X.map(x => Matrix.multiply([x], ans).to2DArray()[0])
console.log(Z)

const S = Z.map((z,i) => getSimilarity(Y[i], z))
console.log(S)

const min = S.reduce((d, min, idx) => d.min > min ? { idx, min } : d, {idx:0, min:S[0]})
console.log('min', X[min.idx])
