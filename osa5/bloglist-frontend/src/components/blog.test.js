import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './simpleblog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      author: 'Tiina Partanen',
      title: 'Koodauksen ABC',
      likes: 4,
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
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
})
