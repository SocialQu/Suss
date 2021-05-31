// npx ts-node pca-summary


import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'

import { transcript } from './data'

const sentences = [
    'Allow me to paint a picture.', 
    'Alan, Brandon and Jeremiah have moved into an office that’s really just the back part of a friend’s office, separated by a partition.', 
    'There are large west-facing windows, and it’s the middle of summer.', 
    'They have no air conditioning, so they have five fans on full blast, and they’re all working shirtless.'
]



const getLength = (vector:number[]) => {
    const l2 = vector.reduce((d, i) => d+=Math.pow(i,2), 0)
    const l = Math.sqrt(l2)
    return l
}


const normalize = (vector:number[]) => {
    const min = vector.reduce((d, i) => i < d ? i : d, 0)
    const positives = vector.map(v => v - min)

    const l = getLength(positives)
    const v = positives.map(i => i/l)
    return v
}


const normalizeMatrix = (M:number[][]) => {
    const min = M.reduce((d,i) => {
        const m = i.reduce((d, idx) => d > idx ? idx : d, 0)
        return d > m ? m : d
    }, 0)

    const positives = M.map(r => r.map(c => c - min))
    const avgL = positives.map(p => getLength(p)).reduce((d,i, _, l) => d+=(i/l.length), 0)

    const units = positives.map((r) => r.map(c => c/avgL))
    return units    
}


const transpose = (m:number[][]) => {
    const zeros = [...Array(m[0].length)].map(() => [...Array(m.length)])
    m.map((v,idx) => v.map((c,i) => zeros[i][idx] = c))
    return zeros
}



const summarize = async() => {
//     // Embed Sentences
//     const sentences = transcript.split('\n')
    // const model = await load()
    // const tensors = await model.embed(['Hello', 'Good Bye', 'Is a good day'])
    // const embeddings = await tensors.array()


}

const similarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

const sortBySimilarity = (center:number[], vectors:number[][]) => vectors.sort((a, b) => 
    similarity(center, a) > similarity(center, b) ? 1 : -1
)

const M = [
    [7,4],
    [6,4],
    [4,2],
    [2,1],


    [4,7]
]



const test = async() => {
    // const model = await load()
    // const tensors = await model.embed(['Hello', 'Good Bye', 'Is a good day'])
    // const vectors = await tensors.array()
    // const M = transpose(vectors)

    // const normals = M.map(i => normalize(i))
    // console.log('m', normals)

    // const original = transpose(normals)
    // // console.log('original', original)

    const sentences = transcript.split('\n')
    const model = await load()

    // const sentences = [
    //     'The next step is to derive the topic’s center.',
    //     'We find for every topic the average position of its documents.', 
    //     'When we want to classify an unlabeled document.', 
    //     'We can transform its content into a vectorial representation.',
    //     'And use the distance metric to find the closest topic',
    //     'The sky is blue',
    //     'Galileo interpreted the laws of physics.'
    // ]

    const tensors = await model.embed(sentences)
    const vectors = await tensors.array()
    const M = transpose(vectors)

    const pca = new PCA(M)
    const reduce = pca.predict(M, {nComponents:1}).to2DArray()
    // console.log('reduced', reduce)

    const transposed = transpose(reduce)
    // console.log('transposed', transposed)

    const normalized = transposed.map(v => normalize(v))
    // const normalized = normalizeMatrix(transposed)
    // console.log('normalized', normalized)

    normalized.map((r) => {
        const similarities = vectors.map(i => similarity(r, i))
        // console.log(similarities)

        const min = Math.min(...similarities)
        const idx = similarities.findIndex(s => s === min)
        console.log(sentences[idx])
    })
}


test().catch(console.log)
