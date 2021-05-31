// npx ts-node information-metrics
import { transcript } from './data'


const getStandardDeviation = (vector:number[]) => {
    const n = vector.length
    const mean = vector.reduce((a, b) => a + b, 0) / n
    const deviation = Math.sqrt(vector.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return deviation
}

interface iDictionary {[key:string]:number}
const getDictionary = (words:string[]) => words.reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1}), {} as iDictionary)

interface iGetInformation { words:string[], dictionary:iDictionary, tokens:number}
const getInformation = ({words, dictionary, tokens}:iGetInformation) => words.reduce((d, w) => d-=Math.log(dictionary[w]/tokens), 0)


const rankSentences = () => {
    const words = transcript.split(/[\s\n]+/)
    const tokens = transcript.split('\n')
    const dictionary = getDictionary(words)

    const sentences = tokens.map((text, i) => ({ 
        text, 
        order:i,
        information:getInformation({ words:text.split(' '), dictionary, tokens:words.length })
    }))

    const sorted = sentences.sort(({information:a}, {information:b}) => a > b ? -1 : 1)
    const filtered = sorted.filter((_, idx) => idx < 10)
    console.log(filtered)
}

rankSentences()
