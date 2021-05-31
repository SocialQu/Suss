// npx ts-node cluster-summary

import { load } from '@tensorflow-models/universal-sentence-encoder'
import { transcript } from './data'
import '@tensorflow/tfjs-node'


const kmeans = require('ml-kmeans')

export interface iSentences {
    text:string
    cluster:number
    order:number
    d1?:number[]
    d2?:number[]
    embeddings?:number[]
}


const summarize = async() => {
    // Embed Sentences
    const tokens = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(tokens)
    const embeddings = tensors.arraySync()

    const { clusters } = kmeans(embeddings, 5)
    // console.log(clusters.length)

    const sentences:iSentences[] = tokens.map((t,i) => ({
        text:t, 
        order:i,
        cluster:clusters[i]
    }))

    console.log(sentences)
}


summarize().catch(console.log)
