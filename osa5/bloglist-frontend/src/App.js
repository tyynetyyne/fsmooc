import React from 'react'
import {
  Blog,
  Notification,
  LoggedInUser,
  LoginForm,
  BlogForm,
  Togglable,
  TogglableArea,
} from './components/Blog'
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
  loginVisible: false,
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

  toggleVisibility() {
    //console.log('toggle visibility', this.state.loginVisible)
    this.setState({ loginVisible: this.state.loginVisible ? false : true })
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
        newAuthor: '',
        newUrl: '',
        newTitle: '',
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

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} type="error" />
          <Notification message={this.state.info} type="info" />
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange.bind(this)}
            handleSubmit={this.login.bind(this)}
            loginVisible={this.state.loginVisible}
            toggleVisibility={this.toggleVisibility.bind(this)}
          />
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
        <Togglable buttonLabel="add a new blog">
          <BlogForm
            addBlog={this.addBlog}
            handleChange={this.handleBlogFieldChange}
            newTitle={this.state.newTitle}
            newAuthor={this.state.newAuthor}
            newUrl={this.state.newUrl}
          />
        </Togglable>
        <h2>Blogs in the database</h2>

        {this.state.blogs.map(blog => {
          //console.log('blog', blog)
          return (
            <div style={blogStyle} key={blog.id}>
              <TogglableArea>
                <Blog blog={blog} />
              </TogglableArea>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
