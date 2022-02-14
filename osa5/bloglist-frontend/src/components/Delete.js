import React from 'react'

const Delete = ({ deleteBlog, blog }) => {

  const handleDelete = (event) => {
    event.preventDefault()

    deleteBlog(blog.id)
  }

  return (
    <div>
      <button id="deleteBlog" onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Delete