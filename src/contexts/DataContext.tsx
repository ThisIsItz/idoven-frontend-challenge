import React, { createContext, useState } from 'react'
import {
  HeartData,
  getDataFile,
  getParsedData,
  getReader
} from '../utils/dataUtils'
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
  const [inHeartData, setInHeartData] = useState<any>(0)

  const lazyHeartData = async () => {
    if (!inHeartData) {
      const heartData = new HeartData('/data/idoven-data.zip')
      await heartData.loadData()
      setInHeartData(heartData)
      return heartData
    }
    return inHeartData
  }

  const loadNextValues = async () => {
    try {
      const heartData = await lazyHeartData()
      const parsedData = await heartData.getParsedData()
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
