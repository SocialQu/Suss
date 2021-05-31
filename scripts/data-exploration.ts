// npx ts-node data-exploration

import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'

import { promises as fs } from 'fs'
import { PCA } from 'ml-pca'

import { iSentences } from './cluster-summary'
import { transcript } from './data'


const kmeans = require('ml-kmeans')

const dir = '../suss/src/data'
const reduce = async(embeddings:number[][], dimensions:number) => {
    const pca = new PCA(embeddings)
    const reduced = pca.predict(embeddings, {nComponents:dimensions}).to2DArray()
    return reduced
}

const storeData = async() => {
    const tokens = transcript.split('\n')
    const model = await load()
    const tensors = await model.embed(tokens)
    const embeddings = await tensors.array()

    const D1 = await reduce(embeddings, 1)
    const D2 = await reduce(embeddings, 2)
    const { clusters } = kmeans(embeddings, 5)

    const sentences:iSentences[] = tokens.map((t,i) => ({
        text:t, 
        order:i,
        cluster:clusters[i],
        d1:[i,D1[i][0]],
        d2:D2[i]
    }))


    const data = [0,1,2,3,4].reduce((d, i) => {
        d[i] = sentences.filter(({ cluster }) => cluster === i)
        return d
    }, [[],[],[],[],[]] as iSentences[][])

    await fs.writeFile(`${dir}/cluster-data.json`, JSON.stringify(data))

    return
}

storeData().catch(console.log)
