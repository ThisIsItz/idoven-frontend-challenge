import JSZip from 'jszip'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { DataContextProps, DataProps } from '../utils/types'

export const DataContext = createContext<DataContextProps | undefined>(
  undefined
)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [linesToAdd, setLinesToAdd] = useState<number>(30000)

  console.log('data.length', data.length)
  console.log('linesToAdd', linesToAdd)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/idoven-data.zip')
        const blob = await response.blob()

        const zip = new JSZip()
        await zip.loadAsync(blob)

        const txtFile = zip.file('14-29-05_data_data.txt')

        if (txtFile) {
          const contentBlob = await txtFile.async('blob')
          const contentStream = contentBlob.stream()
          const reader = contentStream.getReader()
          let lineCount = 0
          let content = ''

          while (lineCount < linesToAdd) {
            const { done, value } = await reader.read()

            if (done) break

            content += new TextDecoder().decode(value)
            const lines = content.split('\n')
            lineCount = lines.length - 1

            if (lineCount >= linesToAdd) break
          }
          const startLine = 0
          const endLine = linesToAdd
          const linesToDisplay = content.split('\n').slice(startLine, endLine)

          const parsedData = linesToDisplay.map((line) => {
            const values = line.split(',')
            return {
              time: values[0],
              value: values[1]
            }
          })
          setData((prevData) => [...prevData, ...parsedData])
        } else {
          console.error('No text file was found in the ZIP.')
        }
      } catch (error) {
        console.error('Error loading the ZIP file:', error)
      }
    }

    fetchData()
  }, [linesToAdd])

  const handleNextPage = () => {
    setLinesToAdd((prevLines) => prevLines + 10000)
  }

  const contextValue: DataContextProps = {
    data,
    handleNextPage
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}
