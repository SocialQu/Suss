import { load } from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs-node'


export interface iDictionary {[key:string]:number}
export const getDictionary = (words:string[]) => words.reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1}), {} as iDictionary)

interface iGetInformation { words:string[], dictionary:iDictionary, tokens:number}
export const getInformation = ({words, dictionary, tokens}:iGetInformation) => words.reduce((d, w) => d-=Math.log(dictionary[w]/tokens), 0)


export const getSimilarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}


export const getEmbeddings = async(sentences:string[]) => {
    const model = await load()
    const tensors = await model.embed(sentences)
    const embeddings = await tensors.array()
    return embeddings
    
}

export const findCenter = (vectors: number[][]) => [...Array(vectors[0].length)].map((_, idx) => 
    vectors.reduce((d,i)=> d + i[idx], 0)/vectors.length
)
