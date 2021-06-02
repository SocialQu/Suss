// npx ts-node linear-regression

import sentences from './data/embeddings.json'
import { Matrix, solve } from 'ml-matrix'
import { getSimilarity } from './utils'

interface iSentence {embeddings:number[], text:string}
const linearSummary = (sentences:iSentence[]) => {
    const embeddings = sentences.map(({ embeddings }) => embeddings )
    const order = [...Array(embeddings.length)].map((_,i) => [i])

    const fit = solve(embeddings, order).to2DArray()
    const predictions = embeddings.map(x => 
        Matrix.multiply(x.map(i => [i]), fit).sum()
    )

    const similarities = sentences.map((sentence,i) => ({
        order:i,
        ...sentence,
        similarity:getSimilarity(order[i], [predictions[i]])
    })).sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)


    const sorted = [...similarities].sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)
    const breakpoint = Math.round(sentences.length * .02)
    const minSimilarity = sorted[breakpoint].similarity

    const summary = similarities.filter(({ similarity }) => similarity < minSimilarity)
        .sort(({ order:a }, { order:b }) => a > b ? 1 : -1)
        .map(({ text, order, similarity }) => ({text, order, similarity}))



    console.log(summary.map(({ order, text, similarity }) => [order, text, similarity]))
    return summary
}


linearSummary(sentences as iSentence[])
