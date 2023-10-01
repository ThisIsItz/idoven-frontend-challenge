import { Box } from '@mui/material'
import { COLORS } from '../utils/colors'
import { DataContextProps } from '../utils/types'
import ECGChart from './ECGChart'
import InfoTooltip from './InfoTooltip'
import Loader from './Loader'
import StyledButton from './StyledButton'
import { useDataContext } from '../contexts/useDataContext'

export default function ECGWrapper() {
  const { data, currentPage, handlePrevPage, handleNextPage } =
    useDataContext() as DataContextProps

  const isDataAvailable = data.length > 1

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
          <ECGChart data={data} />
        </Box>
        <Box sx={{ mt: '2px', mr: '4px', float: 'right' }}>
          <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
            Move left
          </StyledButton>
          <StyledButton onClick={handleNextPage}>Move right</StyledButton>
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
