export interface DataProps {
  time: string
  value: string
}

export interface DataContextProps {
  data: DataProps[]
  currentPage: number
  isLoadingMoreData: boolean
  handlePrevPage: () => void
  handleNextPage: () => void
}
