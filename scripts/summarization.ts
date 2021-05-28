// npx ts-node summarization

import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'

import { transcript } from './data'


const findCenter = (vectors: number[][]) => [...Array(vectors[0].length)].map((_, idx) => 
    vectors.reduce((d,i)=> d + i[idx], 0)/vectors.length
)


const getSimilarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

const summarize = async() => {
    // Embed Sentences
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()
    // console.log(embeddings[0])

    // Get Center
    const center = findCenter(embeddings)
    // console.log(center.filter((_, i) => i < 10))

    // Compute Similarity
    const similarities = embeddings.map(e => getSimilarity(center, e))
    console.log('similarities:', similarities)

    // Get 5 - 10% of sentences by distance.

    // Test summarization.

    // Plan next steps.
}


summarize().catch(console.log)
