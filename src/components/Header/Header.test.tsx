import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'

test('Header loads and displays text', async () => {
  render(<Header />)

  await screen.findByRole('heading')

  expect(screen.getByRole('heading')).toHaveTextContent(
    'Idoven.ai Coding Challenge'
  )
})
