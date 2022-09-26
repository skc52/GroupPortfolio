import React from 'react'
import {YouTube, GitHub, Web, ThumbUp} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Comment from "../Comment/Comment.js"
import "./Project.css"
const Project = () => {
  return (
    <div className='projectShell'>
        {/* created at */}
        {/* image */}
        {/* description */}
        {/*  links */}
        {/* likes */}
        {/* comments */}
        <div className='topPart'>
            <small>Added at 12 dec 2020</small>
            

        </div>
        <div className='middlePart'>
            <img src="" alt="project Image" />
            <h2>Project Name</h2>
            <p className='ProjectDescription'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem fugit sapiente tempora in illo eveniet assumenda fuga eos odio aliquid?
            </p>

            <div className='techStackContainer'>
                <h3>Skills/Technologies</h3>
                <ul className='techStack'>
                    <li>Express</li>
                    <li>Node</li>
                    <li>Express</li>
                    <li>Node</li>
                </ul>
            </div>

            <div className='linkGroups'>
                <Link>
                    <YouTube/>
                </Link>
                <Link>
                    <GitHub/>
                </Link>
                <Link>
                    <Web/>
                </Link>
            </div>
            
       

            <div className='likeProject'>
                <ThumbUp/>
            </div>

      
            <h3>Comments</h3>
            <input type="text" className='commentInput'/>
            <div className='commentSection'>
                <Comment/>
                <Comment/>
            </div>
            
        </div>


    </div>
  )
}

export default Project
