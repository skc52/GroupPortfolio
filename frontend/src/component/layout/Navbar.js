import React from 'react'
import {Person, Logout, Home, Pages, Chat, Notifications} from '@mui/icons-material'
import "./Navbar.css"
import { Link} from 'react-router-dom'
import Searchbar from './Searchbar'

const Navbar = () => {
  return (
    <>
        <div className='Profile'>

            <Link to = '/profile/me'>
                <Person/>
            </Link>

            <Searchbar/>

            <Link to = '/home'>
                <Home/>
            </Link>

            <Link to = '/portfolio/me'>
                <Pages/>
            </Link>

            <Link to = '/chat'>
                <Chat/>
            </Link>

            <Link to = '/notification'>
                <Notifications/>
            </Link>

            <Link to = '/signin'>
                <Logout/>
            </Link>
                
            
            
        </div>
    </>
  )
}

export default Navbar
