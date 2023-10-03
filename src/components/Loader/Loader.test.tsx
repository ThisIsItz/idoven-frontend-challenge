import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader component', () => {
  test('renders without text', () => {
    render(<Loader />)
    const circularProgress = screen.getByRole('progressbar')

    expect(circularProgress).toBeInTheDocument()

    const textElement = screen.queryByText('Some text')
    expect(textElement).not.toBeInTheDocument()
  })

  test('renders with text', () => {
    render(<Loader text="Loading Data" />)
    const circularProgress = screen.getByRole('progressbar')

    expect(circularProgress).toBeInTheDocument()

    const loadedTextElement = screen.getByText('Loading Data')
    expect(loadedTextElement).toBeInTheDocument()
  })
})
