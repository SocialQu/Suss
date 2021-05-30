// npx ts-node pca-summary


import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'

import { transcript } from './data'

const summarize = async() => {
    // Embed Sentences
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()


}
