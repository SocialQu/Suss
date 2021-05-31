// npx ts-node data-exploration.ts

import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'

import { transcript } from './data'
import { promises as fs } from 'fs'


const dir = '../suss/src/data'
const reduce = async(embeddings:number[][], dimensions:number) => {
    const pca = new PCA(embeddings)
    const reduced = pca.predict(embeddings, {nComponents:dimensions}).to2DArray()
    await fs.writeFile(`${dir}/${dimensions}D-data.json`, JSON.stringify(reduced))
}

const storeData = async() => {
    const sentences = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()

    await reduce(embeddings, 1)
    await reduce(embeddings, 2)
    return
}

storeData().catch(console.log)
