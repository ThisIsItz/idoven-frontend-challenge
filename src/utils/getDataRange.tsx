import { NUMBER_OF_DATA } from './constants'

export const getDataRange = (currentPage: number = 1) => {
  let start, end

  if (currentPage === 1) {
    start = 1
  } else {
    start = (currentPage - 1) * NUMBER_OF_DATA
  }

  end = currentPage * NUMBER_OF_DATA

  return [start, end]
}
