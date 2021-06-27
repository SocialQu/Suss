import { getSimilarity, getDictionary, getEmbeddings } from "./utils"
const kmeans = require('ml-kmeans')


interface iConclusion {
    beginning:string[]
    middle:string[]
    end:string[]
}

interface iSummary {
    titles: string[]
    topics: string[][]
    notes: string[]
    conclusions: iConclusion
}

interface iSentence {
    text:string
    order:number
    cluster?:number
    embeddings:number[]
}


interface iCentroid {
    centroid:number[]
    error:number
    size:number
}

interface iClustered {
    clusters:number[]
    centroids:iCentroid[]
}


const getTitles = (sentences:iSentence[]):string[] => {
    const center:number[] = [] // TODO: Search for center.
    const similarities = sentences.map((s, i) => ({ ...s, similarity:getSimilarity(s.embeddings, center)}))
    const sortedSentences = [...similarities].sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)
    const topSentences = sortedSentences.filter((_, i) => i < 10)

    const titles = topSentences.map(({ text }) => text)
    return titles
}

const getTopics = (sentences:iSentence[]):string[][] => {
    const embeddings = sentences.map(({embeddings}) => embeddings)
    const { clusters, centroids }:iClustered = kmeans(embeddings, 5)
    sentences.map((s,i) => ({...s, cluster:clusters[i]}))

    const topics = centroids.map(({ centroid }, i) => {
        const filtered = sentences.filter(({ cluster }) => cluster === i)
        const similarities = filtered.map((s, i) => ({ ...s, similarity:getSimilarity(s.embeddings, centroid)}))
        const sorted = [...similarities].sort(({ similarity: a }, { similarity: b }) => a > b ? 1 : -1)
        const topSentences = sorted.filter((_, i) => i < 5)
        return topSentences.map(({ text }) => text)
    })

    return topics
}



const getNotes = ():string[] => []
const getConclusion = ():iConclusion => ({
    beginning:[],
    middle:[],
    end:[]
})


const summarize = async(transcript:string):Promise<iSummary> => {
    const words = transcript.split(/[\s\n]+/)
    const tokens = transcript.split('\n')
    const embeddings = await getEmbeddings(tokens)
    const sentences:iSentence[] = tokens.map((text, order) => ({
        text,
        order,
        embeddings:embeddings[order]
    }))

    const dictionary = getDictionary(words)
    return {
        titles:getTitles(sentences),
        topics:getTopics(sentences),
        notes:getNotes(),
        conclusions:getConclusion()
    }
}

summarize('')
