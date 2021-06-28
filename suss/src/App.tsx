import { App as RealmApp, User, Credentials } from 'realm-web'
import { useState, CSSProperties } from 'react'

import { NavBar, SussView } from './components/NavBar'
import { Transcription } from './views/Transcription'
import { Summary, iSummary } from './views/Summary'
import { Footer } from './components/Footer'
import { Landing } from './views/Landing'
import { Charts } from './views/Charts'

import 'bulma/css/bulma.css'
import './App.css'


const sectionStyle:CSSProperties = {
    paddingBottom:0,
    minHeight:'calc(100vh - 180px)'
}

const summary:iSummary = {
    titles:[{label:`Meeting's Summary`}],
    topics:[[{label:'Topic A'}], [{label:'Topic B'}], [{label:'Topic C'}], [{label:'Topic D'}]],
    notes:[[{label:'Note A'}], [{label:'Note B'}], [{label:'Note C'}], [{label:'Note D'}]],
    conclusions: [{label:'Meeting Conclusion'}]
}


export const App = () => {
    const [ view, setView ] = useState<SussView>('Home')

	return <>
        <NavBar click={(view) => setView(view)}/>

        <div className='section' style={sectionStyle}>
            { view === 'Home' && <Landing click={() => setView('Transcript')}/> }
            { view === 'Transcript' && <Transcription /> }
            { view === 'Charts' && <Charts /> }
            { view === 'Summary' && <Summary {...summary} /> }
        </div>

        <Footer/>
    </>
}
