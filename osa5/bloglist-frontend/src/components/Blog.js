import React, { useState } from 'react'
import Like from '../components/Like'
import Delete from '../components/Delete'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [view, setView] = useState(false)


  const handleView = () => {
    setView(!view)
  }

  const blogStyle = {
    padding: 10,
    border: '1px solid lightgray',
    margin: '3px 0'
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleView}>{!view ? 'view' : 'close'}</button>
      </div>
      {view &&
        <>
          <div>
            {blog.url}
          </div>
          <Like blog={blog} addLike={addLike}/>
          <div>
            {blog.user.username}
          </div>
          {user.username === blog.user.username &&
          <Delete deleteBlog={deleteBlog} blog={blog}/>
          }
        </>
      }
    </div>
  )
}

export default Blog