import React, { createContext, useContext, useEffect, useState } from 'react'
import JSZip from 'jszip'
import { DataContextProps, DataProps } from './utils/types'

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(30000)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/idoven-data.zip')
        const blob = await response.blob()

        const zip = new JSZip()
        await zip.loadAsync(blob)

        let found = false
        let txtFile: JSZip.JSZipObject | undefined

        zip.forEach((relativePath, zipEntry) => {
          if (!found && zipEntry.name.endsWith('.txt')) {
            txtFile = zipEntry
            found = true
          }
        })

        if (txtFile) {
          const contentBlob = await txtFile.async('blob')
          const contentStream = contentBlob.stream()
          let content = ''
          let lineCount = 0

          const reader = contentStream.getReader()

          let done = false

          while (!done) {
            const { done: isDone, value } = await reader.read()

            if (isDone) {
              done = true
            } else {
              content += new TextDecoder().decode(value)

              if (content.includes('\n')) {
                const lines = content.split('\n')
                lineCount += lines.length - 1

                if (lineCount >= currentPage * itemsPerPage) {
                  done = true
                }
              }
            }
          }

          const lines = content.split('\n').slice(0, currentPage * itemsPerPage)
          const parsedData = lines.map((line) => {
            const values = line.split(',')
            return {
              time: values[0],
              value: values[1]
            }
          })
          setData(parsedData)
        } else {
          console.error('No text file was found in the ZIP.')
        }
      } catch (error) {
        console.error('Error loading the ZIP file:', error)
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage])

  const contextValue: DataContextProps = {
    data,
    currentPage,
    itemsPerPage,
    handleNextPage,
    handlePrevPage
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}
