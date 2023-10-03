import { fireEvent, render, screen } from '@testing-library/react'
import ECGChart from '../components/ECGChart'
import React from 'react'

jest.mock('chart.js/auto', () => ({
  Chart: jest.fn()
}))

describe('ECGChart', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  const trimmedData = [
    { time: 1, value: 10 },
    { time: 2, value: 20 }
  ]

  it('renders the ECG chart and reset button', () => {
    render(<ECGChart trimmedData={trimmedData} />)

    const canvas = screen.getByTestId('ecg-canvas')
    const resetButton = screen.getByText('Reset Zoom')

    expect(canvas).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
  })

  it('should do nothing if ref does not exist', () => {
    const useRefSpy = jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: null })
    const mockResetZoom = jest.fn()
    ECGChart.prototype.handleResetZoom = mockResetZoom

    render(<ECGChart trimmedData={trimmedData} />)

    expect(useRefSpy).toBeCalledWith(null)
  })
})
