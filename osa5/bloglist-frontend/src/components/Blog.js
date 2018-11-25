import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
  <div className={type}>
    {message}
  </div>
  )
}

export { Blog, Notification }