import { Box } from '@mui/material'
import { COLORS } from '../../utils/colors'
import { DataContextProps, DataProps } from '../../utils/types'
import ECGChart from '../ECGChart/ECGChart'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import Loader from '../Loader/Loader'
import StyledButton from '../StyledButton/StyledButton'
import { useDataContext } from '../../contexts/useDataContext/useDataContext'
import { useEffect, useState } from 'react'
import { NUMBER_OF_DATA } from '../../utils/constants'
import { getDataRange } from '../../utils/getDataRange/getDataRange'

export default function ECGWrapper() {
  const { data, handleNextPage } = useDataContext() as DataContextProps
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [trimmedData, setTrimmedData] = useState<DataProps[] | []>([])

  const isDataAvailable = data.length > 1

  const onClickNext = () => {
    handleNextPage()
    setCurrentPage(currentPage + 1)
  }

  const onClickPrev = () => {
    setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    async function loadMore() {
      const isEndOfArray = currentPage * NUMBER_OF_DATA >= data.length
      if (isEndOfArray || data.length === 0) {
        await handleNextPage()
      }

      const [start, end] = getDataRange(currentPage)
      setTrimmedData(data.slice(start, end))
    }

    loadMore()
  }, [data, currentPage])

  if (isDataAvailable) {
    return (
      <Box>
        <Box
          sx={{
            cursor: 'help',
            display: 'flex',
            justifyContent: 'end',
            mr: '10px',
            color: COLORS.darkBlue
          }}
        >
          <InfoTooltip title="To zoom in and out, simply use your mouse's scroll wheel. To move around the ECG, just click and drag" />
        </Box>
        <Box>
          <ECGChart trimmedData={trimmedData} />
        </Box>
        <Box sx={{ mt: '2px', mr: '4px', float: 'right' }}>
          <StyledButton onClick={onClickPrev} disabled={currentPage === 1}>
            Load previous data
          </StyledButton>
          <StyledButton onClick={onClickNext}>Load more data</StyledButton>
        </Box>
      </Box>
    )
  }
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: 'translate(-50%, -50%)' }}
      data-testid="ecg-wrapper-loading"
    >
      <Loader text="Please wait, we are loading your data..." />
    </Box>
  )
}
