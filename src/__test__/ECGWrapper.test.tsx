import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ECGWrapper from '../components/ECGWrapper'
import { useDataContext } from '../hooks/useDataContext'
import { DataContextProps } from '../utils/types'

jest.mock('../hooks/useDataContext', () => ({
  useDataContext: jest.fn()
}))

const mockUseDataContext = useDataContext as jest.Mock<
  Partial<DataContextProps>
>

describe('ECGWrapper component', () => {
  beforeEach(() => {
    mockUseDataContext.mockReturnValue({
      data: [],
      currentPage: 1,
      handlePrevPage: jest.fn(),
      handleNextPage: jest.fn()
    })
  })

  test('renders ECGChart when data is available', () => {
    mockUseDataContext.mockReturnValueOnce({
      data: [
        { time: '0', value: '1' },
        { time: '2', value: '3' },
        { time: '3', value: '3' }
      ],
      currentPage: 1,
      handlePrevPage: jest.fn(),
      handleNextPage: jest.fn()
    })

    render(<ECGWrapper />)

    const ecgChart = screen.getByTestId('ecg-chart')
    expect(ecgChart).toBeInTheDocument()

    const moveLeftButton = screen.getByText('Move left')
    const moveRightButton = screen.getByText('Move right')
    expect(moveLeftButton).toBeInTheDocument()
    expect(moveRightButton).toBeInTheDocument()
  })

  test('renders Loader when data is not available', () => {
    render(<ECGWrapper />)

    const loader = screen.getByText('Please wait, we are loading your data...')
    expect(loader).toBeInTheDocument()
  })
})
