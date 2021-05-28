/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties } from 'react'
import { useMediaQuery } from 'react-responsive'

const Title = () => {
    const largeScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div style={{ marginBottom:'2em', marginTop:'2em' }}>
        <p className='title is-1 has-text-centered' style={{color:'white', marginBottom:'0'}}> 
            Summarize your Meetings!
        </p>
        {
            largeScreen && 
            <p 
                className='subtitle is-4 has-text-centered' 
                style={{color:'darkorange', marginBottom:'1rem', marginTop:'0.5rem' }}
            > 
                Süß is a free AI service that transcribes, summarizes, <br/>
                and tracks the effectiveness of your meetings.
            </p>
        }
    </div>
}

const Video = () => <div style={{margin:'auto', textAlign:'center'}}>
    <iframe 
        width="560" 
        height="315" 
        frameBorder="0" 
        allowFullScreen 
        title="Süß intro video." 
        src="https://www.youtube.com/embed/056v4OxKwlI?controls=0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    />
</div>


const ctaStyle:CSSProperties  = { 
    width:'100%', 
    maxWidth:560, 
    fontSize:'1.5rem', 
    borderRadius:12,
    fontWeight:600, 
    height:48
}

const CTA = () => <div className='control' style={{ textAlign:'center', marginTop:'1em' }}>
    <a className='button is-info' style={ctaStyle}> Get Started Now! </a>
</div>

export const Landing = () => <>
    <Title />
    < Video />
    <CTA />
</>
