// npx ts-node information-metrics


const getStandardDeviation = (vector:number[]) => {
    const n = vector.length
    const mean = vector.reduce((a, b) => a + b, 0) / n
    const deviation = Math.sqrt(vector.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    return deviation
}

const getDictionary = (text:string) => text.split(' ').reduce((d, i) => ({...d, [i]: d[i] ? d[i]+1 : 1}), {} as {[key:string]:number})

