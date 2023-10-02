import { fireEvent, render } from '@testing-library/react'
import InfoTooltip from '../components/InfoTooltip'

test('renders tooltip with title', async () => {
  const title = 'This is a tooltip'

  const tooltip = render(<InfoTooltip title={title} />)

  const icon = tooltip.getByTestId('InfoOutlinedIcon')

  fireEvent.mouseOver(icon)

  expect(await tooltip.findByText(title)).toBeInTheDocument()
})
