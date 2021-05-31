// npx ts-node cluster-summary

import { load } from '@tensorflow-models/universal-sentence-encoder'
import { transcript } from './data'
import '@tensorflow/tfjs-node'


const kmeans = require('ml-kmeans')

const summarize = async() => {
    // Embed Sentences
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = tensors.arraySync()

    const { clusters } = kmeans(embeddings, 5)
    console.log(clusters.length)
}


summarize().catch(console.log)
