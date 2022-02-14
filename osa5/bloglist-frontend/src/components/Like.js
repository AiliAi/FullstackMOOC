import React from 'react'

const Like = ({ blog, addLike }) => {

  const handleLike = (event) => {
    event.preventDefault()

    addLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  return (
    <div className="addLikes">
      {blog.likes} <button onClick={handleLike}>like</button>
    </div>
  )
}

export default Like