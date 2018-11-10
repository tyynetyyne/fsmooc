const listHelper = require('../utils/list_helper')
const testData = require('./testdata')

const bestBlogOne = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 5
}

const bestAuthorMany = {
  author: "Robert C. Martin",
  blogs: 3
}

const bestAuthorOne = {
  author: 'Edsger W. Dijkstra',
  blogs: 1
}

const mostLikesMany = {
  author: "Edsger W. Dijkstra",
  likes: 17
}

const mostLikesOne = {
  author: 'Edsger W. Dijkstra',
  likes: 5
}

const bestBlogMany = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12
}

describe.skip('list helpers', () => {

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('the likes when the list has many blogs', () => {
    const result = listHelper.totalLikes(testData.manyBlogs)
    expect(result).toBe(36)
  })
})

describe('total likes', () => {

  test('likes when the list has only one blog', () => {
    const result = listHelper.totalLikes(testData.oneBlog)
    expect(result).toBe(5)
  })
})

describe('total likes', () => {

  test('the likes when the list is empty', () => {
    const result = listHelper.totalLikes(testData.zeroBlogs)
    expect(result).toBe(0)
  })
})

describe('max likes', () => {

  test('the best blog when the list has many blogs', () => {
    const result = listHelper.favoriteBlog(testData.manyBlogs)
    expect(result).toEqual(bestBlogMany)
  })
})

describe('max likes', () => {

  test('the best blog when the list has only one blog', () => {
    const result = listHelper.favoriteBlog(testData.oneBlog)
    expect(result).toEqual(bestBlogOne)
  })
})

describe('max likes', () => {

  test('the best blog when the list is empty', () => {
    const result = listHelper.favoriteBlog(testData.zeroBlogs)
    expect(result).toBe(null)
  })
})

describe('best author', () => {

  test('the author with most blogs', () => {
    const result = listHelper.mostBlogs(testData.manyBlogs)
    expect(result).toEqual(bestAuthorMany)
  })
})

describe('best author', () => {

  test('the author with most blogs, list of one', () => {
    const result = listHelper.mostBlogs(testData.oneBlog)
    expect(result).toEqual(bestAuthorOne)
  })
})

describe('best author', () => {

  test('the author with most blogs, empty list', () => {
    const result = listHelper.mostBlogs(testData.zeroBlogs)
    expect(result).toBe(null)
  })
})

describe('most likes', () => {

  test('the author with most likes', () => {
    const result = listHelper.mostLikes(testData.manyBlogs)
    expect(result).toEqual(mostLikesMany)
  })
})

describe('most likes', () => {

  test('the author with most likes, list of one', () => {
    const result = listHelper.mostLikes(testData.oneBlog)
    expect(result).toEqual(mostLikesOne)
  })
})

describe('most likes', () => {

  test('the author with most likes, empty list', () => {
    const result = listHelper.mostLikes(testData.zeroBlogs)
    expect(result).toBe(null)
  })
})
})