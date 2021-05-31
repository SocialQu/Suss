import { App as RealmApp, User, Credentials } from 'realm-web'
import { useState, CSSProperties } from 'react'

import { Transcription } from './views/Transcription'
import { NavBar, SussView } from './components/NavBar'
import { Footer } from './components/Footer'
import { Landing } from './views/Landing'
import { Charts } from './views/Charts'

import 'bulma/css/bulma.css'
import './App.css'



const connectMongo = async() => {
    const REALM_APP_ID = 'tasktracker-kjrie'
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}


const sectionStyle:CSSProperties = {
    paddingBottom:0,
    minHeight:'calc(100vh - 180px)'
}

export const App = () => {
    const [ view, setView ] = useState<SussView>('Home')

	return <>
        <NavBar click={(view) => setView(view)}/>

        <div className='section' style={sectionStyle}>
            { view === 'Home' && <Landing click={() => setView('Transcript')}/> }
            { view === 'Transcript' && <Transcription /> }
            { view === 'Charts' && <Charts /> }
        </div>

        <Footer/>
    </>
}
