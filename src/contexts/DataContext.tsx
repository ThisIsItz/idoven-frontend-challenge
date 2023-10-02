import React, { createContext, useEffect, useState } from 'react'
import { getDataFile, getParsedData, getReader } from '../utils/dataUtils'
import { DataContextProps, DataProps } from '../utils/types'

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [reader, setReader] = useState<
    ReadableStreamDefaultReader<Uint8Array> | undefined
  >(undefined)

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
      setData(parsedData)
    } catch (error) {
      console.error('Error loading the ZIP file:', error)
    }
  }

  useEffect(() => {
    loadNextValues()
  }, [])

  const handleNextPage = loadNextValues

  const contextValue: DataContextProps = {
    data,
    handleNextPage
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}
