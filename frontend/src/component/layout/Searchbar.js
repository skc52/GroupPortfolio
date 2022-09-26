import React from 'react'
import "./Searchbar.css"
import {Search} from "@mui/icons-material"
const Searchbar = () => {
  return (
    <div className='searchbar'>
        <div className='inputBar'>
            <input type="text"  />
        </div>
        <Search/>
    </div>
  )
}

export default Searchbar
