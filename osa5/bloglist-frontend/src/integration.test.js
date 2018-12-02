import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { TogglableArea, LoginForm } from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders no blogs, only login form', () => {
      app.update()
      // console.log('app', app.debug())
      const blogComponents = app.find(TogglableArea)
      const loginComponents = app.find(LoginForm)
      expect(blogComponents.length).toEqual(0)
      expect(loginComponents.length).toEqual(1)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja',
      }
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('all notes are rendered', () => {
      app.update()
      //console.log('app', app.debug())
      const blogComponents = app.find(TogglableArea)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
