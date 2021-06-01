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
        Matrix.multiply(x.map(i => [i]), fit).to2DArray()[0]
    )

    const similarities = predictions.map((z,i) => getSimilarity(order[i], z))
    const min = similarities.reduce((d, min, idx) => d.min > min ? { idx, min } : d, {idx:0, min:similarities[0]})
    const { text } = sentences[min.idx]
    console.log(min.idx, text)

}

linearSummary(sentences)

