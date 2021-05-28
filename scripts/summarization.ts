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

    // Find average

    // Compute Distance

    // Get 5 - 10% of sentences by distance.

    // Test summarization.

    // Plan next steps.
}


summarize().catch(console.log)
