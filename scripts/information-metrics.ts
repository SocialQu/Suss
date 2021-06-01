// npx ts-node information-metrics


import clusters from '../suss/src/data/cluster-data.json'
import embeddings from './data/embeddings.json'
import { transcript } from './data'
import { getSimilarity } from './utils'
const kmeans = require('ml-kmeans')


const getVariance = (vector:number[]) => {
    const n = vector.length
    const mean = vector.reduce((a, b) => a + b, 0) / n
    const deviation = Math.sqrt(vector.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return deviation
}

interface iDictionary {[key:string]:number}
const getDictionary = (words:string[]) => words.reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1}), {} as iDictionary)

interface iGetInformation { words:string[], dictionary:iDictionary, tokens:number}
const getInformation = ({words, dictionary, tokens}:iGetInformation) => words.reduce((d, w) => d-=Math.log(dictionary[w]/tokens), 0)

const words = transcript.split(/[\s\n]+/)
const sentences = transcript.split('\n')
const dictionary = getDictionary(words)

const rankSentences = () => {

    const tokens = sentences.map((text, i) => ({ 
        text, 
        order:i,
        information:getInformation({ words:text.split(' '), dictionary, tokens:words.length })
    }))

    const sorted = tokens.sort(({information:a}, {information:b}) => a > b ? -1 : 1)
    const filtered = sorted.filter((_, idx) => idx < 10)
    console.log(filtered)
}

// rankSentences()

const measureClusters = () => {
    const sizes = clusters.map(c => c.length)
    const averages = clusters.map(c => c.reduce((d, { order }) => d+=order, 0)/c.length)
    const variance = clusters.map(c => getVariance(c.map(({ order }) => order)))
    const information = clusters.map(cluster => cluster.reduce((d, { text }) => 
        d+=getInformation({ words:text.split(' '), dictionary, tokens:words.length })
    , 0)/cluster.length)

    console.log('sizes', sizes)
    console.log('averages', averages)
    console.log('variance', variance)
    console.log('information', information)
}

// measureClusters()


const findCenter = () => {
    const { centroids } = kmeans(embeddings.map(({ embeddings }) => embeddings), 1)
    const similarities = centroids.map(({ centroid }:{ centroid:number[] }) => 
        embeddings.map(({text, embeddings}) => ({
            text,
            similarity:getSimilarity(centroid, embeddings)
        }))
        .sort(({ similarity: a}, {similarity: b}) => a > b ? 1 : -1)
        .filter((_, idx) => idx < 5)
    )

    console.log('similarities', similarities)
}


findCenter()
