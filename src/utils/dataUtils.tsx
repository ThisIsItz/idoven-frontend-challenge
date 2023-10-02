import JSZip from 'jszip'
import { NUMBER_OF_DATA } from './constants'

export class HeartData {
  constructor(filePath) {
    this.filePath = filePath
    this.textFile = null
    this.file = null
    this.reader = null
  }

  private getDataFile = async (zipFile) => {
    const blob = await zipFile.blob()
    const zip = new JSZip()
    await zip.loadAsync(blob)

    return zip.file('14-29-05_data_data.txt')
  }

  private getReader = async (textFile: JSZip.JSZipObject | null) => {
    if (!textFile) {
      console.error('No text file was found in the ZIP.')
      return
    }

    const contentBlob = await textFile.async('blob')
    const contentStream = contentBlob.stream()
    return contentStream.getReader()
  }

  loadData = async () => {
    this.zipFile = await fetch('/data/idoven-data.zip')
    await this.loadReader()
  }

  loadReader = async () => {
    this.textFile = await this.getDataFile(this.zipFile)
    this.reader = await this.getReader(this.textFile)
  }

  readNextLines = async (numberOfLines: number) => {
    if (!this.reader) {
      console.error('reader not loaded!')
      return
    }

    const { done, value } = await this.reader.read()
    if (done) return

    const content = new TextDecoder().decode(value)

    return content.split('\n')
  }

  getParsedData = async () => {
    const linesToDisplay = await this.readNextLines()

    return linesToDisplay!.map((line) => {
      const values = line.split(',')
      return {
        time: parseFloat(values[0]),
        value: parseInt(values[1])
      }
    })
  }

  getPreviousParsedData = async (prevPage) => {
    this.reader = await this.getReader(this.textFile)

    for (let i = 0; i <= prevPage - 1; i++) await this.reader.read()

    return this.getParsedData()
  }
}

export const readNextLines = async (
  reader: ReadableStreamDefaultReader<Uint8Array> | undefined,
  numberOfLines: number
) => {
  if (!reader) return
  const { done, value } = await reader.read()
  if (done) return

  const content = new TextDecoder().decode(value)
  const lines = content.split('\n')

  return lines.slice(0, numberOfLines)
}

export const readPrevLines = async (
  reader: ReadableStreamDefaultReader<Uint8Array> | undefined,
  numberOfLines: number
) => {
  if (!reader) return
  const { done, value } = await reader.read()
  if (done) return

  const content = new TextDecoder().decode(value)
  const lines = content.split('\n')

  return lines.slice(0, numberOfLines)
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

export const getDataFile = async (zipFile) => {
  const blob = await zipFile.blob()
  const zip = new JSZip()
  await zip.loadAsync(blob)

  return zip.file('14-29-05_data_data.txt')
}

export const getParsedData = async (
  fileReader: ReadableStreamDefaultReader<Uint8Array> | undefined
) => {
  const linesToDisplay = await readNextLines(fileReader, NUMBER_OF_DATA)

  return linesToDisplay!.map((line) => {
    const values = line.split(',')
    return {
      time: parseFloat(values[0]),
      value: parseInt(values[1])
    }
  })
}
