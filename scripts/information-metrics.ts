// npx ts-node information-metrics


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
