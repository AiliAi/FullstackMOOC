import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    allBlogs()
  }, [])

  const allBlogs = () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(initialBlogs)
      })
      .catch(() => {
        console.log('failed to get all')
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    if (user) {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setErrorMessage(false)
      setMessage(`User ${username} logged out successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      setErrorMessage(true)
      setMessage(`User ${username} logging out failed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(false)
        setMessage(`New blog ${blogObject.title} by ${blogObject.author} added successfully`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(true)
        setMessage('Adding blog failed')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(() => {
        allBlogs()
        setErrorMessage(false)
        setMessage(`A like added to blog ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(true)
        setMessage('Adding like failed')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (id) => {

    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() => {
          allBlogs()
          setErrorMessage(false)
          setMessage(`Blog with id ${id} deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(true)
          setMessage('Failed to delete blog')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(false)
      setMessage(`User ${username} logged in successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const showBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog id="blogList" key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {
        <Notification message={message} errorMessage={errorMessage} />
      }
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App