import { Scatter } from '../atoms/Scatter'
import data from '../data/cluster-data.json'

export const Charts = () => {
    return <div className='container' >
        <p 
            className='title is-1 has-text-centered' 
            style={{color: 'white', marginBottom:'1em'}}
        > Meeting Charts </p>

        <div>
            <Scatter 
                label={'Information Through Time'}
                data={data.map(clusters => clusters.map(({ text, d1 }) => ({ name:text, x:d1[0], y:d1[1] }) ))}
            />

            <Scatter 
                label={'2D Sentence Representation'}
                data={data.map(clusters => clusters.map(({ text, d2 }) => ({ name:text, x:d2[0], y:d2[1] }) ))}
            />
        </div>
    </div>
}
