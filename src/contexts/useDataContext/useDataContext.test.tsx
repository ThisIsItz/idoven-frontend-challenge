import ECGWrapper from '../../components/ECGWrapper/ECGWrapper'
import { DataContext } from '../DataContext/DataContext'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'

describe('useDataContext', () => {
  const contextData = {
    data: [
      { time: 1, value: 2 },
      { time: 2, value: 10 }
    ],
    handleNextPage: jest.fn()
  }

  test('test if context is working', async () => {
    render(
      <DataContext.Provider value={contextData}>
        <ECGWrapper />
      </DataContext.Provider>
    )

    const loadMoreButton = screen.getByText('Load more data')

    await waitFor(() => {
      userEvent.click(loadMoreButton)
    })

    expect(contextData.handleNextPage).toHaveBeenCalled()
  })
})
