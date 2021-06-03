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


const getTitles = ():string[] => []
const getTopics = ():string[][] => []
const getNotes = ():string[] => []
const getConclusion = ():iConclusion => ({
    beginning:[],
    middle:[],
    end:[]
})


const summarize = (text:string):iSummary => ({
    titles:getTitles(),
    topics:getTopics(),
    notes:getNotes(),
    conclusions:getConclusion()
})
