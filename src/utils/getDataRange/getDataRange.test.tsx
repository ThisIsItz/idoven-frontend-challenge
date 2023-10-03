import { NUMBER_OF_DATA } from '../utils/constants'
import { getDataRange } from '../utils/getDataRange/getDataRange'

describe('getDataRange', () => {
  it('calculates the data range correctly for the first page', () => {
    const currentPage = 1
    const [start, end] = getDataRange(currentPage)

    expect(start).toBe(1)
    expect(end).toBe(1 * NUMBER_OF_DATA)
  })

  it('calculates the data range correctly for a non-first page', () => {
    const currentPage = 3
    const [start, end] = getDataRange(currentPage)

    expect(start).toBe(2 * NUMBER_OF_DATA)
    expect(end).toBe(3 * NUMBER_OF_DATA)
  })
})
