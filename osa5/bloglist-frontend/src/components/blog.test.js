import React from 'react'
import { shallow, mount } from 'enzyme'
import SimpleBlog from './simpleblog'
import { TogglableArea } from './blog'

describe.only('<TogglableArea />', () => {
  it('renders title and author only', () => {
    const blog = {
      author: 'Tiina Partanen',
      title: 'Koodauksen ABC',
      likes: 4,
      url: 'http://koodauksenabc.blogspot.fi',
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerDel = jest.fn()

    const blogComponent = mount(
      <TogglableArea
        blog={blog}
        likeHandler={mockHandlerLike}
        deleteHandler={mockHandlerDel}
      />
    )

    const shortDiv = blogComponent.find('.shortinfo')

    expect(shortDiv.text()).toContain(blog.title)
    expect(shortDiv.text()).toContain(blog.author)

    const addinfoDiv = blogComponent.find('.addinfo')

    expect(addinfoDiv.prop('style')).toHaveProperty('display', 'none')
  })

  it('renders title, author, url and likes', () => {
    const blog = {
      author: 'Tiina Partanen',
      title: 'Koodauksen ABC',
      likes: 4,
      url: 'http://koodauksenabc.blogspot.fi',
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerDel = jest.fn()

    const blogComponent = mount(
      <TogglableArea
        blog={blog}
        likeHandler={mockHandlerLike}
        deleteHandler={mockHandlerDel}
      />
    )

    const shortDiv = blogComponent.find('.shortinfo')

    expect(shortDiv.text()).toContain(blog.title)
    expect(shortDiv.text()).toContain(blog.author)

    const addinfoDiv = blogComponent.find('.addinfo')
    expect(addinfoDiv.prop('style')).toHaveProperty('display', 'none')

    expect(addinfoDiv.text()).toContain(blog.url)
    expect(addinfoDiv.text()).toContain(blog.likes)

    const togglableDiv = blogComponent.find('.togglable')
    togglableDiv.simulate('click')

    //console.log('togglableDiv', togglableDiv.debug())

    const addinfoDiv_new = blogComponent.find('.addinfo')
    expect(addinfoDiv_new.prop('style')).toHaveProperty('display', '')
  })
})

//describe.only('<SimpleBlog />', () => {
it('renders content', () => {
  const blog = {
    author: 'Tiina Partanen',
    title: 'Koodauksen ABC',
    likes: 4,
  }

  const blogComponent = render(<SimpleBlog blog={blog} />)
  // console.log('blogcomponent', blogComponent.debug())

  const contentDiv = blogComponent.find('.content')
  // console.log('contentDIV', contentDiv.debug())

  expect(contentDiv.text()).toContain(blog.title)
  expect(contentDiv.text()).toContain(blog.author)

  const likeDiv = blogComponent.find('.likes')
  expect(likeDiv.text()).toContain(blog.likes)
})

it('clicking the button calls event handler once', () => {
  const blog = {
    author: 'Tiina Partanen',
    title: 'Koodauksen ABC',
    likes: 4,
  }

  const mockHandler = jest.fn()

  const blogComponent = shallow(
    <SimpleBlog blog={blog} likeHandler={mockHandler} />
  )

  const button = blogComponent.find('button')
  button.simulate('click')
  button.simulate('click')

  expect(mockHandler.mock.calls.length).toBe(2)
})
//})
