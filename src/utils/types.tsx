export interface DataProps {
  time: number
  value: number
}

export interface DataContextProps {
  data: DataProps[]
  handleNextPage: () => void
}
