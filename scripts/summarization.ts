// npx ts-node summarization

import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'

import { transcript } from './data'


export const average = (vectors: number[][]) => [...Array(vectors[0].length)].map((_, idx) => 
    vectors.reduce((d,i)=> d + i[idx], 0)/vectors.length
)

const summarize = async() => {
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()
    // console.log(embeddings[0])

    const center = average(embeddings)
    console.log(center.filter((_, i) => i < 10))

    // Compute Distance

    // Get 5 - 10% of sentences by distance.

    // Test summarization.

    // Plan next steps.
}


summarize().catch(console.log)
