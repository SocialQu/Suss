/*
npx ts-node summarize
*/

import { getSimilarity, getDictionary, getEmbeddings, getInformation, findCenter } from "./utils"
import { Matrix, solve } from 'ml-matrix'
import { transcript } from './data'

const kmeans = require('ml-kmeans')

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
    const topSentences = sortedSentences.filter((_, i) => i < 10)
    const titles = topSentences.map(({ text }) => text)
    return titles
}

interface iCentroid { centroid:number[], error:number, size:number }
interface iClustered { clusters:number[], centroids:iCentroid[] }
const getTopics = (sentences:iSentence[]):string[][] => {
    const embeddings = sentences.map(({embeddings}) => embeddings)
    const { clusters, centroids }:iClustered = kmeans(embeddings, 5)
    const clustered = sentences.map((s,i) => ({...s, cluster:clusters[i]}))

    const topics = centroids.map(({ centroid }, i) => {
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
    const order = [...Array(embeddings.length)].map((_,i) => [i])

    const fit = solve(embeddings, order).to2DArray()
    const predictions = embeddings.map(x => Matrix.multiply(x.map(i => [i]), fit).sum())

    interface iSimilarity extends iSentence { similarity:number }
    const similarities:iSimilarity[] = sentences.map((sentence,i) => ({
        ...sentence,
        similarity:getSimilarity(order[i], [predictions[i]])
    }))

    const beginning = similarities.filter((s, i) => i < sentences.length/3)
    const middle = similarities.filter((s, i) => i < sentences.length/3 && i < sentences.length/3*2)
    const end = similarities.filter((s, i) => i > sentences.length/3*2)

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



interface iSummary { titles: string[], topics: string[][], notes: string[], conclusions: iConclusion }
const summarize = async(transcript:string):Promise<iSummary> => {
    const words = transcript.split(/[\s\n]+/)
    const tokens = transcript.split('\n')
    const embeddings = await getEmbeddings(tokens)
    const sentences:iSentence[] = tokens.map((text, order) => ({ text, order, embeddings:embeddings[order] }))

    return {
        titles:getTitles(sentences),
        topics:getTopics(sentences),
        notes:getNotes(sentences, words),
        conclusions:getConclusion(sentences)
    }
}


summarize(transcript).then(console.log).catch(console.log)


/* Tests

1. The titles have the greatest overall similarity. (Pass)
2. There are 5 top sentences by topic.
3. The notes have the most information.
4. Beggining, Middle & End similarity. 

*/
