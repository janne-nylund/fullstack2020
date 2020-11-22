import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Tests with single user and blog post', () => {

  let blog
  let user

  beforeEach(() => {
    blog = {
      title: 'Test title for blog testing',
      author: 'Test Tester',
      url: 'www.test.com',
      user: '5fa13a57d690b37418c6e381'
    }

    user = {
      username: 'jnylund',
      name: 'Janne Nylund',
      id: '5fa13a57d690b37418c6e381'
    }
  })

  test('5.13 - blog initially renders title and author, but not url and likes', () => {

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const div1 = component.container.querySelector('.default')
    expect(div1).not.toHaveStyle('display: none')
    expect(div1).not.toHaveTextContent('Url')
    expect(div1).not.toHaveTextContent('Likes')

    const div2 = component.container.querySelector('.onView')
    expect(div2).toHaveStyle('display: none')
  })

  test('5.14 - view button click renders title, author, url & likes', () => {

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const div1 = component.container.querySelector('.default')
    expect(div1).toHaveStyle('display: none')

    const div2 = component.container.querySelector('.onView')
    expect(div2).not.toHaveStyle('display: none')
    expect(div2).toHaveTextContent('Url')
    expect(div2).toHaveTextContent('Likes')
  })

  test('5.15 - clicking button twice calls event handler twice', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})

describe('Form test', () => {
  test('5.16 - Testing BlogForm', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Test title for blog' }
    })
    fireEvent.change(author, {
      target: { value: 'Json Bourne' }
    })
    fireEvent.change(url, {
      target: { value: 'www.test.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test title for blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Json Bourne')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
  })
})