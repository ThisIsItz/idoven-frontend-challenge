import React, { createContext, useEffect, useState } from 'react'
import { DataContextProps, DataProps } from '../utils/types'
import { getReader, getDataFile, getParsedData } from '../utils/dataUtils'
import { Stream } from 'stream'

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [reader, setReader] = useState<Stream | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      setIsLoading(true)
      const fileReader = await lazyGetReader()

      const parsedData = await getParsedData(fileReader)
      setData(parsedData)
    } catch (error) {
      console.error('Error loading the ZIP file:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      loadNextValues()
    }
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
