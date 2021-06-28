import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useState, CSSProperties, useEffect } from "react"
import { ctaStyle } from '../views/Landing'


const transcriptionStyle:CSSProperties = {
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

export const Transcription = () => {
    const { transcript, interimTranscript, finalTranscript } = useSpeechRecognition({ clearTranscriptOnListen:true })
    const [ isListening, setIsListening ] = useState(false)
    const [ , setSentences ] = useState<string[]>([])

    useEffect(() => {
        const newTranscript = interimTranscript.replace(finalTranscript, '')
        console.log(!newTranscript.length)
        if(!newTranscript.length) setSentences(s => [...s, s.reduce((d, i) => d.replace(i, ''), finalTranscript)]) 
    }, [interimTranscript, finalTranscript])


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
  
    return <div className='container' style={transcriptionStyle}>
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
