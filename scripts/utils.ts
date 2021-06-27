export interface iDictionary {[key:string]:number}
export const getDictionary = (words:string[]) => words.reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1}), {} as iDictionary)

interface iGetInformation { words:string[], dictionary:iDictionary, tokens:number}
export const getInformation = ({words, dictionary, tokens}:iGetInformation) => words.reduce((d, w) => d-=Math.log(dictionary[w]/tokens), 0)


export const getSimilarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}
