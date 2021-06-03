import { getSimilarity } from "./utils"


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

interface iSentence{
    text:string
    order:number
    embeddings:number[]
}


const getTitles = (sentences:iSentence[], center:number[]):string[] => {
    const similarities = sentences.map((s, i) => ({ ...s, similarity:getSimilarity(s.embeddings, center)}))
    const sortedSentences = [...similarities].sort(({ similarity:a }, { similarity:b }) => a > b ? 1 : -1)
    const topSentences = sortedSentences.filter((_, i) => i < 10)
    
    console.log(topSentences.map(({ order, similarity}) => console.log(order, similarity)))
    const titles = topSentences.map(({ text }) => text)
    return titles
}

const getTopics = ():string[][] => []
const getNotes = ():string[] => []
const getConclusion = ():iConclusion => ({
    beginning:[],
    middle:[],
    end:[]
})


const summarize = (sentences:iSentence[]):iSummary => {

    return {
        titles:getTitles(sentences, []),
        topics:getTopics(),
        notes:getNotes(),
        conclusions:getConclusion()
    }
}

summarize([])
