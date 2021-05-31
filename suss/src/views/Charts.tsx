import { Scatter } from '../atoms/Scatter'
import D1 from '../data/1D-data.json'
import D2 from '../data/2D-data.json'

export const Charts = () => {
    return <div className='container' >
        <p 
            className='title is-1 has-text-centered' 
            style={{color: 'white'}}
        > Meeting's Charts </p>

        <div>
            <Scatter 
                label={'Information Through Time'}
                data={[D1.map(([y], x) => ({x, y, name:''}))]} 
            />

            <Scatter 
                label={'2D Sentences Representation'}
                data={[D2.map(([x,y]) => ({x, y, name:''}))]} 
            />
        </div>
    </div>
}
