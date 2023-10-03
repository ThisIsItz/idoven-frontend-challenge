import { useContext } from 'react'
import { DataContextProps } from '../../utils/types'
import { DataContext } from '../DataContext/DataContext'

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}
