import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useState, CSSProperties } from "react"
import { ctaStyle } from '../views/Landing'


const summarizationStyle:CSSProperties = {
    fontSize:21,
    maxWidth:720,
    color:'white',
    margin:'auto',
    paddingBottom:'1em',
    minHeight:'calc(100vh - 80px - 100px - 4em)'
}

const transcriptStyle:CSSProperties = {
    padding: '1.5rem 0',    
    minHeight:'calc(100vh - 80px - 100px - 4em - 1em - 100px)'
}

export const Summarization = () => {
    const { transcript } = useSpeechRecognition()
    const [ isListening, setIsListening ] = useState(false)

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) return <div>
        Browser is not Support Speech Recognition.
    </div>


    const listen = () => {
        setIsListening(true)
        SpeechRecognition.startListening({ continuous: true })
    }
  
    const stop = () => {
        setIsListening(false)
        SpeechRecognition.stopListening()
    }
  
    return <div className='container' style={summarizationStyle}>
        <p 
            className='title is-1 has-text-centered' 
            style={{marginBottom:'0', color: transcript ? 'lightskyblue' : 'white'}}
        > 
            Meeting's Transcript
        </p>

        <div style={transcriptStyle}>
            <p> { transcript} </p>
        </div>

        <div className='control' style={{ textAlign:'center', marginTop:'1em' }}>
            { 
                !isListening && 
                    <button className='button is-info' style={ctaStyle} onClick={listen}> 
                        { !transcript ? 'Start Meeting' : 'Resume' } 
                    </button> 
            }
            { isListening && <button className='button is-warning' style={ctaStyle} onClick={stop}> Stop </button> }
        </div>
    </div>
}
