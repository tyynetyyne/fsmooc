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

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>
            {this.props.buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

class TogglableArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <p onClick={this.toggleVisibility}>
            {this.props.children.props.blog.title}
            {this.props.children.props.blog.author}
          </p>
        </div>
        <div style={showWhenVisible}>
          {/* {console.log('props', this.props.children.props.blog)} */}
          <p onClick={this.toggleVisibility}>
            {this.props.children.props.blog.title}
            {this.props.children.props.blog.author}
            <br />
            <a href={this.props.children.props.blog.url}>
              {this.props.children.props.blog.url}
            </a>
            <br />
            {this.props.children.props.blog.likes}{' '}
            <button
              onClick={
                this.props.children.props
                  .likeHandler /*this.props.children.props.likeHandler(
                this.props.children.props.blog.id
              ) */
              }
            >
              like
            </button>
            <br />
            Added by {this.props.children.props.blog.user.name}
          </p>
        </div>
      </div>
    )
  }
}

const BlogForm = ({ addBlog, handleChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>New blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input value={newTitle} name="newTitle" onChange={handleChange} />
        </div>
        <div>
          Author:
          <input value={newAuthor} name="newAuthor" onChange={handleChange} />
        </div>
        <div>
          Url:
          <input value={newUrl} name="newUrl" onChange={handleChange} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

const LoginForm = ({
  handleSubmit,
  handleChange,
  username,
  password,
  loginVisible,
  toggleVisibility,
}) => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <h2>Login to see blogs</h2>
      <div style={hideWhenVisible}>
        <button type="login" onClick={toggleVisibility}>
          log in
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <button type="cancel" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
}

export {
  Blog,
  Notification,
  LoggedInUser,
  LoginForm,
  BlogForm,
  Togglable,
  TogglableArea,
}
