import React from 'react'

const SimpleBlog = ({ blog, likeHandler }) => (
  <div>
    <div className="content">
      {blog.title}
      {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button className="button" onClick={likeHandler}>
        like
      </button>
    </div>
  </div>
)

export default SimpleBlog
