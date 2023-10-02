import { Box } from '@mui/material'
import { COLORS } from '../utils/colors'
import { DataContextProps } from '../utils/types'
import ECGChart from './ECGChart'
import InfoTooltip from './InfoTooltip'
import Loader from './Loader'
import StyledButton from './StyledButton'
import { useDataContext } from '../hooks/useDataContext'
import { useState } from 'react'

export default function ECGWrapper() {
  const { data, handleNextPage } = useDataContext() as DataContextProps
  const [currentPage, setCurrentPage] = useState<number>(1)

  console.log(currentPage)
  const isDataAvailable = data.length > 1

  const onClickLoadMore = () => {
    handleNextPage()
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

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
          <ECGChart data={data} currentPage={currentPage} />
        </Box>
        <Box sx={{ mt: '2px', mr: '4px', float: 'right' }}>
          <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
            Load previous data
          </StyledButton>
          <StyledButton onClick={onClickLoadMore}>Load more data</StyledButton>
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
    >
      <Loader text="Please wait, we are loading your data..." />
    </Box>
  )
}
