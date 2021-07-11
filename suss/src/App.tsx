import { useState, CSSProperties } from 'react'
import { getSummary, iSummary } from './scripts/summarize'

import { NavBar, SussView } from './components/NavBar'
import { Transcription } from './views/Transcription'
import { Summary } from './views/Summary'
import { Footer } from './components/Footer'
import { Landing } from './views/Landing'
import { Charts } from './views/Charts'

import 'bulma/css/bulma.css'
import './App.css'


const sectionStyle:CSSProperties = {
    paddingBottom:0,
    minHeight:'calc(100vh - 180px)'
}


export const App = () => {
    const [ view, setView ] = useState<SussView>('Home')
    const [ summary, setSummary ] = useState<iSummary>()

    const summarize = async(sentences:string[]) => { 
        const summary = await getSummary(sentences)
        setSummary(summary)
        setView('Summary')
    }

	return <>
        <NavBar click={(view) => setView(view)}/>

        <div className='section' style={sectionStyle}>
            { view === 'Home' && <Landing click={() => setView('Transcript')}/> }
            { view === 'Transcript' && <Transcription summarize={summarize}/> }
            { view === 'Charts' && <Charts /> }
            { view === 'Summary' && summary && <Summary {...summary} /> }
        </div>

        <Footer/>
    </>
}
