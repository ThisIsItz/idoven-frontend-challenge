import JSZip from 'jszip'

export const readLines = async (
  reader: ReadableStreamDefaultReader<Uint8Array> | undefined,
  numberOfLines: number
) => {
  if (!reader) return
  const { done, value } = await reader.read()
  console.log('done', done)

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

export const getDataFile = async () => {
  const response = await fetch('/data/idoven-data.zip')
  const blob = await response.blob()

  const zip = new JSZip()
  await zip.loadAsync(blob)

  return zip.file('14-29-05_data_data.txt')
}

export const getParsedData = async (
  fileReader: ReadableStreamDefaultReader<Uint8Array> | undefined
) => {
  const linesToDisplay = await readLines(fileReader, 10000)

  return linesToDisplay!.map((line) => {
    const values = line.split(',')
    return {
      time: parseFloat(values[0]),
      value: parseInt(values[1])
    }
  })
}
