const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.likes
  }, 0)
  return likes
}


const favoriteBlog = blogs => {
  //const maxLikes = Math.max(...blogs.map(item => item.likes), 0);
  const maxLikes = blogs.reduce((previousValue, currentValue) => {
    return (previousValue.likes > currentValue.likes) ? previousValue : currentValue
  }, 0)
  return maxLikes
}

const mostBlogs = blogs => {
  const group =  _(blogs)
    .groupBy('author')
    .map((items, author) => { 
      return { 'author': author, 'blogs': items.length }
    }).value()

  const maxBlogs = _.maxBy(group, 'blogs')
    
  return blogs.length === 0 ? 0 : maxBlogs
}

const mostLikes = blogs => {
  const group =  _(blogs)
    .groupBy('author')
    .map((items, author) => { 
      return { 'author': author, 'likes': _.sumBy(items, 'likes' )}
    }).value()

  const maxLikes = _.maxBy(group, 'likes')
    
  return blogs.length === 0 ? 0 : maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}