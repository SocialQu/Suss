/*
npx ts-node conclusion
*/

import { Matrix, solve } from 'ml-matrix'


const linear = () => {
    const reduced = [[2,2], [2,3], [5,3]]
    console.log([...Array(reduced.length)].map((_,i) => [i]))

    const order = [...Array(reduced.length)].map((_,i) => [i])

    const fit = solve(reduced, order).to2DArray()
    console.log('fit', fit)

    const dif = (x:number[], y:number, fit:number[][]) => {
        const prediction = x[0]*fit[0][0] + x[1]*fit[1][0]
        console.log('prediction', prediction)

        const delta = prediction - y
        return delta
    }

    reduced.map((x, i) => console.log(i, dif(x, order[i][0], fit)))

    const predictions = reduced.map(x => Matrix.multiply(x.map(i => [i]), fit).sum())
    console.log(predictions)
}

linear()
