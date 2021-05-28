import { App as RealmApp, User, Credentials } from 'realm-web'
import { useState, useEffect, CSSProperties } from 'react'
import amplitude from 'amplitude-js'

import { Summarization } from './views/Summarization'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Landing } from './views/Landing'

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
    const [ user, setUser ] = useState<User>()
    const [ isLanding, setLanding ] = useState(true)

    useEffect(() => {
        return 

        connectMongo().then(user => setUser(user))

        amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_TOKEN as string)
        amplitude.getInstance().logEvent('VISIT_SUSS')
    }, [])


	return <>
        <NavBar goHome={() => setLanding(true)}/>

        <div className='section' style={sectionStyle}>
            {
                isLanding
                ?   <Landing click={() => setLanding(false)}/>
                :   <Summarization />
            }
        </div>

        <Footer/>
    </>
}
