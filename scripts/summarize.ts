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


const summarize = (text:string):iSummary => {
    return {
        titles:[],
        topics:[],
        notes:[],
        conclusions:{
            beginning:[],
            middle:[],
            end:[]
        }
    }
}
