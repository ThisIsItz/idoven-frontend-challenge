import JSZip from 'jszip'
import { DataProps, ReaderType } from './types'

export const getParsedData = async (
  reader: ReaderType
): Promise<DataProps[]> => {
  const linesToDisplay = await readNextLines(reader)
  console.log(linesToDisplay)
  return linesToDisplay!.map((line) => {
    const values = line.split(',')
    return {
      time: parseFloat(values[0]),
      value: parseInt(values[1])
    }
  })
}

export const getReader = async (textFile: JSZip.JSZipObject | null) => {
  if (!textFile) {
    console.error('No text file was found in the ZIP.')
    return
  }

  const contentBlob = await textFile.async('blob')
  const contentStream = contentBlob.stream()
  return contentStream.getReader()
}

export const getDataFile = async () => {
  const response = await fetch('/data/idoven-data.zip')
  const blob = await response.blob()

  const zip = new JSZip()
  await zip.loadAsync(blob)

  return zip.file('14-29-05_data_data.txt')
}

export async function readNextLines(reader: ReaderType) {
  if (!reader) {
    console.error('reader not loaded!')
    return
  }

  const { done, value } = await reader.read()
  if (done) return

  const content = new TextDecoder().decode(value)

  return content.split('\n')
}
