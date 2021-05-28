// npx ts-node summarization

import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'

import { transcript } from './data'


const summarize = async() => {
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()

    console.log(embeddings[0])
}


summarize().catch(console.log)
