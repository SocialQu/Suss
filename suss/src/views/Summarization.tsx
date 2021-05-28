import { ctaStyle } from '../views/Landing'
import { CSSProperties } from "react"


const summarizationStyle:CSSProperties = {
    margin:'auto',
    maxWidth:720,
    fontSize:21,
    paddingBottom:'1em',
    minHeight:'calc(100vh - 80px - 100px - 4em)'
}

export const Summarization = () => {
    const click =() => {}

    return <div className='container' style={summarizationStyle}>
        <p className='title is-1 has-text-centered' style={{color:'white', marginBottom:'0'}}> 
            Meeting's Transcript
        </p>

        <div style={{minHeight:'calc(100vh - 80px - 100px - 4em - 1em - 100px)'}}>

        </div>

        <div className='control' style={{ textAlign:'center', marginTop:'1em' }}>
            <button className='button is-info' style={ctaStyle} onClick={click}> Get Started Now! </button>
        </div>
    </div>
}
