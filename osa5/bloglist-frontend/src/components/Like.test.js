import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Like from './Like'

test('when clicking the like button two times also eventhandler is called two times', async () => {
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

  const mockHandler = jest.fn()

  const component = render(
    <Like blog={blog} addLike={mockHandler}/>
  )

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})