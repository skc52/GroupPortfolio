import React from 'react'
import "./Comment.css"
const Comment = () => {
  return (
    <>
        <ul className='commentShell'>
            {/* Profile Icon Name Comment/Reply */}
                <li className='comment'>Lorem ipsum, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum eos ea aperiam maxime hic velit non ducimus quaerat optio recusandae? dolor sit amet consectetur adipisicing elit. Minus, tempore. <a href="">Reply</a> </li>
                <ul className='ReplyThread'>
                    <li className='reply'>Reply1 </li>
                    <li className='reply'>Reply2</li>
                    <a href="">All Comments</a>
                </ul>

                <li className='comment'> adipisicing elit. Eon ducimus quaerat optio recusandae? dolor sit amet consectetur adipisicing elit. Minus, tempore. <a href="">Reply</a> </li>
                <ul className='ReplyThread'>
                    <li className='reply'>Reply1 </li>
                    <li className='reply'>Reply2</li>
                    <a href="">All Comments</a>
                </ul>
                
        </ul>
    </>
  )
}

export default Comment
