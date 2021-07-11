import { getSimilarity, getDictionary, getEmbeddings, getInformation, findCenter } from './utils'
import { GroupTypeBase, OptionTypeBase } from 'react-select'

import { Tensor2D } from '@tensorflow/tfjs'
import { Matrix, solve } from 'ml-matrix'
import KMeans from 'tf-kmeans'
import { PCA } from "ml-pca"


interface iSentence {
    text:string
    order:number
    cluster?:number
    information?:number
    embeddings:number[]
}

const getTitles = (sentences:iSentence[]):string[] => {
    const center:number[] = findCenter(sentences.map(({ embeddings }) => embeddings))
    const similarities = sentences.map((s, i) => ({ ...s, similarity:getSimilarity(s.embeddings, center)}))
    const sortedSentences = [...similarities].sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)
    const topSentences = sortedSentences.filter((_, i) => i < 5)
    const titles = topSentences.map(({ text }) => text)
    return titles
}


const getTopics = (sentences:iSentence[], embeddings:Tensor2D):string[][] => {
    const distanceFunction = KMeans.EuclideanDistance
	const kmeans = new KMeans({ k:5, maxIter:200, distanceFunction })

	const clusters = kmeans.Train(embeddings)
    const predictions = clusters.arraySync() as number[]
    const centroids = kmeans.Centroids().arraySync() as number[][]

    const clustered = sentences.map((s,i) => ({...s, cluster:predictions[i]}))

    const topics = centroids.map(( centroid, i) => {
        const filtered = clustered.filter(({ cluster }) => cluster === i)
        const similarities = filtered.map((s, i) => ({ ...s, similarity:getSimilarity(s.embeddings, centroid)}))
        const sorted = [...similarities].sort(({ similarity: a }, { similarity: b }) => a > b ? 1 : -1)
        const topSentences = sorted.filter((_, i) => i < 5)
        return topSentences.map(({ text }) => text)
    })

    return topics
}

const getNotes = (sentences:iSentence[], words:string[]):string[] => {
    const dictionary = getDictionary(words)
    const informed = sentences.map(s => ({...s, information:getInformation({ words:s.text.split(' '), dictionary, tokens:words.length})}))
    const sorted = [...informed].sort(({ information: a }, { information: b }) => a < b ? 1 : -1)
    const mostInformed = sorted.filter((_, i) => i < 12).map(({ text }) => text)
    return mostInformed
}


interface iConclusion { beginning:string[], middle:string[], end:string[] }
const getConclusion = (sentences:iSentence[]):iConclusion => {
    const embeddings = sentences.map(({ embeddings }) => embeddings )
    const order = [...Array(embeddings.length)].map((_,i) => [Math.floor(i/(embeddings.length/3))])

    const pca = new PCA(embeddings)
    const reduced = pca.predict(embeddings, { nComponents:2 }).to2DArray()

    const fit = solve(reduced, order).to2DArray()

    const predictions = reduced.map(x => Matrix.multiply(x.map(i => [i]), fit).sum())

    interface iSimilarity extends iSentence { similarity:number }
    const similarities:iSimilarity[] = sentences.map((sentence,i) => ({
        ...sentence,
        similarity:getSimilarity(order[i], [predictions[i]])
    }))

    const beginning = similarities.filter((_, i, l) => i < l.length/3)
    const middle = similarities.filter((_, i, l) => i > l.length/3 && i < l.length*2/3)
    const end = similarities.filter((_, i, l) => i > l.length*2/3)

    const getTop = (sentences:iSimilarity[]) => {
        const sorted = [...sentences].sort(({ similarity: a }, { similarity: b }) => a > b ? 1 : -1)
        const top = sorted.filter((_, i) => i < 5).map(({ text }) => text)
        return top
    }
    
    return {
        beginning:getTop(beginning),
        middle:getTop(middle),
        end:getTop(end)
    }
}


interface iTextSummary { titles:string[], topics:string[][], notes:string[], conclusions:iConclusion }
export interface iSummary {
    titles:OptionTypeBase[]
    topics:OptionTypeBase[][]
    notes:OptionTypeBase[]
    conclusions:GroupTypeBase<OptionTypeBase>[]
}

const summarize = ({ titles, topics, notes, conclusions:{ beginning, middle, end } }:iTextSummary):iSummary => ({
    titles:titles.map(t => ({label: t})),
    topics:topics.map(t => t.map(i => ({label: i}))),
    notes:notes.map(n => ({label: n})),
    conclusions:[
        {label:'begining', options:beginning.map(b => ({label:b}))},
        {label:'middle', options:middle.map(b => ({label:b}))},
        {label:'end', options:end.map(e =>({label:e}))}
    ]
})



export const getSummary = async(tokens:string[]):Promise<iSummary> => {
    const tensors = await getEmbeddings(tokens)
    const embeddings = await tensors.array()
    const words = tokens.join().split(' ')
    const sentences:iSentence[] = tokens.map((text, order) => ({ text, order, embeddings:embeddings[order] }))
    const summary = {
        titles:getTitles(sentences),
        topics:getTopics(sentences, tensors),
        notes:getNotes(sentences, words),
        conclusions:getConclusion(sentences)
    }

    return summarize(summary)
}
