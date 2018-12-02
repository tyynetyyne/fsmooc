import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { TogglableArea, LoginForm } from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders no blogs, just the login button', () => {
    app.update()
    console.log('app', app.debug())
    const blogComponents = app.find(TogglableArea)
    const loginComponents = app.find(LoginForm)
    expect(blogComponents.length).toEqual(0)
    expect(loginComponents.length).toEqual(1)
  })
})
