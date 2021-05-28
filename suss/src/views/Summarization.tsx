import { CSSProperties } from "react"

const summarizationStyle:CSSProperties = {
    margin:'auto',
    maxWidth:720,
    fontSize:21,
    paddingBottom:'3em'
}

export const Summarization = () => <div className='container' style={summarizationStyle}>
    <p className='title is-1 has-text-centered' style={{color:'white', marginBottom:'0'}}> 
        Meeting's Transcript
    </p>

</div>
