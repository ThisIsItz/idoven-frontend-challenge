import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ECGWrapper from './ECGWrapper'
import { DataContextProps } from '../../utils/types'
import { useDataContext } from '../../contexts/useDataContext'

jest.mock('../../contexts/useDataContext', () => ({
  useDataContext: jest.fn()
}))

const mockUseDataContext = useDataContext as jest.Mock<
  Partial<DataContextProps>
>

describe('ECGWrapper component', () => {
  beforeEach(() => {
    mockUseDataContext.mockReturnValue({
      data: [],
      handleNextPage: jest.fn()
    })
  })

  test('renders ECGChart when data is available', () => {
    mockUseDataContext.mockReturnValueOnce({
      data: [
        { time: 0, value: 1 },
        { time: 2, value: 3 },
        { time: 3, value: 3 }
      ],
      handleNextPage: jest.fn()
    })

    render(<ECGWrapper />)

    const ecgChart = screen.getByTestId('ecg-chart')
    expect(ecgChart).toBeInTheDocument()

    const moveLeftButton = screen.getByText('Load previous data')
    const moveRightButton = screen.getByText('Load more data')
    expect(moveLeftButton).toBeInTheDocument()
    expect(moveRightButton).toBeInTheDocument()
  })

  test('renders Loader when data is not available', () => {
    render(<ECGWrapper />)

    const loader = screen.getByText('Please wait, we are loading your data...')
    expect(loader).toBeInTheDocument()
  })
})
