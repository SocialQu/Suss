// npx ts-node first-summary


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


interface iToken {
    text: string
    order: number
    similarity: number
    embeddings: number[]
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
    // console.log('similarities:', similarities)

    // Get 5 - 10% of sentences by distance.
    const tokens:iToken[] = sentences.map((s, i) => ({
        text:s,
        order:i,
        similarity: getSimilarity(center, embeddings[i]),
        embeddings:embeddings[i]
    }))

    const sortedTokens = [...tokens].sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)
    // console.log('sortedTokens', sortedTokens.filter((_, i) => i < 10).map(({ text, similarity }) => ({similarity, text })))
    
    // Test summarization.
    const breakpoint = Math.round(sentences.length * .05)
    const minSimilarity = sortedTokens[breakpoint].similarity
    const summary = tokens.filter(({ similarity }) => similarity < minSimilarity)
    // console.log('Summary', console.log(summary.map(({ embeddings, ...s }) => s)))
    // console.log('minSimilarity:', minSimilarity)

    console.log('Summary', summary.map(({ text }) => text))

    // Plan next steps.
    /*
    - Compute sentence uniqueness.
    - Dismiss short sentences.
    - Segment by periods.
    - Make charts to analyze it:
        - Dimensionality Reduced Vectors.
        - Bubles by time, size and radians.
        - Distribution of summary by time.
        - Bar chart on similarity (delta to the minimum)
    - Find clusters.
    - Difference between words.
    - Continuity of sentences.
    */
}


summarize().catch(console.log)
