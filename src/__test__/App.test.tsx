import { render, screen } from '@testing-library/react'
import App from '../App'
import { DataProvider } from '../contexts/DataContext/DataContext'

describe('App Component', () => {
  test('renders the App component with Header and ECGWrapper', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    )

    expect(
      screen.getByRole('heading', { name: 'Idoven.ai Coding Challenge' })
    ).toBeInTheDocument()

    expect(screen.getByTestId('ecg-wrapper-loading')).toBeInTheDocument()
  })
})
