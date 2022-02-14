import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import App from './App'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'bla bla',
    url: 'www.blabal.com',
    likes: 2
  }

  const component = render(
    <App blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const blogEl = component.container.querySelector('.blog')
  console.log(prettyDOM(blogEl))
})

