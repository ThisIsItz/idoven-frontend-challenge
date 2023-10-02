export interface DataProps {
  time: string
  value: string
}

export interface DataContextProps {
  data: DataProps[]
  currentPage: number
  handlePrevPage: () => void
  handleNextPage: () => void
}
