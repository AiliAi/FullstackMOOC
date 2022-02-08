const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialblogs = [
  {
    title: 'HTML is easy',
    author: 'Test name',
    url: 'www.test.com',
    likes: 2
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Ugaabuuga',
    url: 'www.ugabuuga.com',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Test name', url: 'www.test.com', likes: 2 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getToken = async (username) => {
  const user = await User.findOne({ username })
  const userForToken = {
    username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports = {
  initialblogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getToken,
}