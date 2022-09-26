import React from 'react'

const Comment = () => {
  return (
    <>
        <ul >
                <li>Comment 1</li>
                <ul>
                    <li>Reply1 </li>
                    <li>Reply2</li>
                    <a href="">All Comments</a>
                </ul>
                <li>Comment 2</li>
                <ul>
                    <li>Reply1 </li>
                    <li>Reply2</li>
                </ul>
        </ul>
    </>
  )
}

export default Comment
