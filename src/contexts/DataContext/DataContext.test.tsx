import { fireEvent, render, waitFor } from '@testing-library/react'
import { getDataFile, getParsedData, getReader } from '../../utils/dataUtils'
import { DataProps } from '../../utils/types'
import { DataContext, DataProvider } from './DataContext'

const mockReader = {
  read: jest.fn(),
  releaseLock: jest.fn(),
  closed: Promise.resolve(undefined),
  cancel: jest.fn()
}

jest.mock('../utils/dataUtils', () => ({
  getDataFile: jest.fn(),
  getParsedData: jest.fn(),
  getReader: jest.fn()
}))

const mockedJSZipObject = {
  name: 'name',
  dir: true,
  date: new Date(),
  comment: 'comment',
  unixPermissions: 16877,
  dosPermissions: null,
  options: {
    compression: 'DEFLATE',
    compressionOptions: null
  },
  async: jest.fn(),
  nodeStream: 1
}

describe('DataContext and DataProvider', () => {
  const data = [
    { time: 1, value: 3234 },
    { time: 2, value: 1234 }
  ]

  test('renders without errors', () => {
    render(
      <DataProvider>
        <DataContext.Consumer>{() => <div>Test</div>}</DataContext.Consumer>
      </DataProvider>
    )
  })

  test('loads and updates data when next page is called', async () => {
    ;(getDataFile as jest.MockedFunction<typeof getDataFile>).mockResolvedValue(
      // @ts-ignore: Unreachable code error
      mockedJSZipObject
    )
    ;(getReader as jest.MockedFunction<typeof getReader>).mockResolvedValue(
      mockReader
    )
    ;(
      getParsedData as jest.MockedFunction<typeof getParsedData>
    ).mockResolvedValue(data)

    const { getByText } = render(
      <DataProvider>
        <DataContext.Consumer>
          {(contextData) => (
            <div>
              <button onClick={contextData!.handleNextPage}>
                Load Next Page
              </button>
              <ul>
                {contextData!.data.map((dataLine: DataProps) => (
                  <li key={dataLine.time}>{dataLine.value}</li>
                ))}
              </ul>
            </div>
          )}
        </DataContext.Consumer>
      </DataProvider>
    )

    fireEvent.click(getByText('Load Next Page'))

    await waitFor(() => {
      expect(getByText(3234)).toBeInTheDocument()
      expect(getByText(1234)).toBeInTheDocument()
    })
  })
})
