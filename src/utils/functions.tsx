import { NUMBER_OF_DATA } from './constants'

export const getDataRange = (currentPage = 1) => {
  const start = currentPage === 1 ? 1 : (currentPage - 1) * NUMBER_OF_DATA
  const end = currentPage * NUMBER_OF_DATA
  return [start, end]
}
