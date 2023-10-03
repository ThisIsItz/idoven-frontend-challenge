import React, { createContext, useState } from 'react'
import { getDataFile, getParsedData, getReader } from '../../utils/dataUtils'
import { DataContextProps, DataProps, ReaderType } from '../../utils/types'

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [reader, setReader] = useState<ReaderType>(undefined)

  const lazyGetReader = async () => {
    if (!reader) {
      const textFile = await getDataFile()
      const fileReader = await getReader(textFile)
      setReader(fileReader)
      return fileReader
    }
    return reader
  }

  const loadNextValues = async () => {
    try {
      const fileReader = await lazyGetReader()
      const parsedData = await getParsedData(fileReader)
      setData([...data, ...parsedData])
    } catch (error) {
      console.error('Error loading the ZIP file:', error)
    }
  }

  const handleNextPage = loadNextValues

  const contextValue: DataContextProps = {
    data,
    handleNextPage
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}
