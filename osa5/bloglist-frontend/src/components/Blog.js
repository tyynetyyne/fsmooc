import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return <div className={type}>{message}</div>
}

const ShortInfoBlog = ({ title, author }) => {
  return (
    <div className="shortinfo">
      {title} {author}
    </div>
  )
}

const LongInfoBlog = ({ url, likes }) => {
  return (
    <div className="longinfo">
      <a href={url}>{url}</a>
      <br />
      <div className="likes">Likes: {likes}</div>
    </div>
  )
}

const LogoutButton = ({ logoutHandler }) => {
  return <button onClick={logoutHandler}>Logout</button>
}

const DeleteButton = ({ deleteHandler }) => {
  return <button onClick={deleteHandler}>Delete</button>
}

const LikeButton = ({ likeHandler, blogId }) => {
  return (
    <button
      className="likebutton"
      onClick={e => {
        e.stopPropagation()
        likeHandler(blogId)
      }}
    >
      Like
    </button>
  )
}

const LoggedInUser = ({ user, logoutHandler }) => {
  return (
    <div>
      <h2>{user.name} logged in</h2>
      <LogoutButton logoutHandler={logoutHandler} />
    </div>
  )
}

const AddedByUser = ({ user, deleteHandler, blogId, loggedInUser }) => {
  return (
    <div>
      Added by {user === undefined ? 'anonymous' : user.name}
      <br />
      {(user === undefined || user.username === loggedInUser.username) && (
        <DeleteButton deleteHandler={deleteHandler(blogId)} />
      )}
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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export class TogglableArea extends React.Component {
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
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div onClick={this.toggleVisibility} className="togglable">
        <ShortInfoBlog
          title={this.props.blog.title}
          author={this.props.blog.author}
        />
        <div style={showWhenVisible} className="addinfo">
          <LongInfoBlog
            url={this.props.blog.url}
            likes={this.props.blog.likes}
          />
          <LikeButton
            likeHandler={this.props.likeHandler}
            blogId={this.props.blog.id}
          />
          <br />
          <AddedByUser
            user={this.props.blog.user}
            deleteHandler={this.props.deleteHandler}
            blogId={this.props.blog.id}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
      </div>
    )
  }
}

TogglableArea.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  likeHandler: PropTypes.func.isRequired,
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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

export {
  Notification,
  LoggedInUser,
  LoginForm,
  BlogForm,
  Togglable,
  //TogglableArea,
}
