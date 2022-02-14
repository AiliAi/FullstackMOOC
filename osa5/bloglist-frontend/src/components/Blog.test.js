import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'bla bla',
    url: 'www.blabal.com',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'bla bla'
  )
  expect(component.container).not.toHaveTextContent(
    'www.blabal.com'
  )
  expect(component.container).not.toHaveTextContent(
    '2'
  )

  const blogEl = component.container.querySelector('.blog')
  console.log(prettyDOM(blogEl))
})


test('clicking the view button displays url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'bla bla',
    url: 'www.blabal.com',
    likes: 2,
    user: {
      username: 'lilli',
      name: 'lilli',
      id: '6200f88c83c24d68960ab437'
    }
  }

  const user = {
    username: 'lilli',
    name: 'lilli',
    id: '6200f88c83c24d68960ab437'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'bla bla'
  )
  expect(component.container).toHaveTextContent(
    'www.blabal.com'
  )
  expect(component.container).toHaveTextContent(
    '2'
  )
})
