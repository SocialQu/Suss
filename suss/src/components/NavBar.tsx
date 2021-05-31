/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react'


interface iNavbarTab extends iNavBar { isActive : boolean }
const GumRoad = ({ isActive }: iNavbarTab) => <a 
    style = {{color:'white'}}
    className={`navbar-item ${isActive ? 'navbar-item-active': ''}`}
    href='https://gumroad.com/l/cortazar' 
    rel='noopener noreferrer'
    target='_blank'
> <strong> PRICING </strong> </a>


const Charts = ({ isActive, click }:iNavbarTab) => <a 
    style = {{color:'white'}}
    onClick ={() => click('Charts')}
    className={`navbar-item ${isActive ? 'navbar-item-active': ''}`}
> Charts </a>

export type SussView = 'Home' | 'Transcript' | 'Summary' | 'Charts'
interface iNavBar { click(view:SussView):void }
export const NavBar = ({ click }: iNavBar) => {
    const [ isActive, setActive ] = useState(false)

    return <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
        <div className='container'>
            <div className='navbar-brand'>
                <a className='navbar-item' onClick={() => click('Home')}>
                    <img src='SocialQ.png' style={{ height:36, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className='navbar-item' style={{ fontSize: '2em', color:'white' }} > SocialQ </p>
                </a>

                <a 
                    role='button' 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
                    aria-label='menu' 
                    aria-expanded='false' 
                    data-target='navbarBasicExample'
                    onClick={()=> setActive(!isActive)}
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>

            <div 
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
                style={{ maxWidth:1200, marginRight:'auto', background:'#0A0A0A' }}
            >
                <div className={`navbar-end ${isActive ? 'navbar-end-active': ''}`} style={{fontSize: '1.2em'}}>
                    <Charts isActive={isActive} click={click}/> 
                </div>

                <div className={`navbar-end ${isActive ? 'navbar-end-active': ''}`} style={{fontSize: '1.2em', marginLeft:16}}>
                    <GumRoad isActive={isActive} click={click}/> 
                </div>
            </div>
        </div>
    </nav>
}
