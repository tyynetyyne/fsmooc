import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return <div className={type}>{message}</div>
}

const LogoutButton = ({ logoutHandler }) => {
  return <button onClick={logoutHandler}>Logout</button>
}

const LoggedInUser = ({ user, logoutHandler }) => {
  return (
    <div>
      <h2>{user.name} logged in</h2>
      <LogoutButton logoutHandler={logoutHandler} />
    </div>
  )
}

export { Blog, Notification, LoggedInUser }
