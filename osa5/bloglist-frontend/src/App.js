import React from 'react'
import { Blog, Notification, LoggedInUser } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './blog.css'

const initialState = {
  blogs: [],
  newTitle: '',
  newAuthor: '',
  newUrl: '',
  error: null,
  info: null,
  username: '',
  password: '',
  user: null,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ ...initialState, blogs: this.state.blogs })
  }

  addBlog = async event => {
    event.preventDefault()

    try {
      const blogObject = {
        url: this.state.newUrl,
        title: this.state.newTitle,
        author: this.state.newAuthor,
      }
      const addedBlog = await blogService.create(blogObject)
      //console.log('response', addedBlog)
      this.setState({
        blogs: this.state.blogs.concat(addedBlog),
        newBlog: '',
        info: `Blog ${addedBlog.title} was added to server`,
      })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'not authorized, blog was not added',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      //console.log('login failed', exception)
      this.setState({
        error: 'username or password invalid',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  loginForm = () => {
    return (
      <div>
        <h2>Login to see blogs</h2>
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  blogForm = () => {
    return (
      <div>
        <h2>New blog</h2>
        <form onSubmit={this.addBlog}>
          <div>
            Title:
            <input
              value={this.state.newTitle}
              name="newTitle"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            Author:
            <input
              value={this.state.newAuthor}
              name="newAuthor"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            Url:
            <input
              value={this.state.newUrl}
              name="newUrl"
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} type="error" />
          <Notification message={this.state.info} type="info" />
          {this.loginForm()}
        </div>
      )
    }
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error} type="error" />
        <Notification message={this.state.info} type="info" />
        <LoggedInUser
          user={this.state.user}
          logoutHandler={this.handleLogout.bind(this)}
        />
        {this.blogForm()}
        <h2>Blogs in the database</h2>
        {this.state.blogs.map(blog => {
          //console.log('blog', blog)
          return <Blog key={blog.id} blog={blog} />
        })}
      </div>
    )
  }
}

export default App
