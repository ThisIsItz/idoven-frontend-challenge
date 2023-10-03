import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import StyledButton from './StyledButton'

const mockOnClick = jest.fn()

describe('StyledButton', () => {
  test('handles click', () => {
    render(<StyledButton onClick={mockOnClick}>Click Me</StyledButton>)

    const buttonElement = screen.getByText('Click Me')

    fireEvent.click(buttonElement)

    expect(mockOnClick).toHaveBeenCalled()
  })

  test('can be disabled', () => {
    render(
      <StyledButton onClick={mockOnClick} disabled={true}>
        Disabled Button
      </StyledButton>
    )

    const disabledButtonElement = screen.getByText('Disabled Button')

    expect(disabledButtonElement).toBeDisabled()
  })
})
