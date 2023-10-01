import { Box } from '@mui/material'
import { useDataContext } from '../DataContext'
import ECGChart from './ECGChart'
import Loader from './Loader'
import StyledButton from './StyledButton'

export default function ECG() {
  const { data, currentPage, handlePrevPage, handleNextPage } = useDataContext()

  if (data.length > 1) {
    return (
      <Box>
        <Box>
          <ECGChart data={data} />
        </Box>
        <Box sx={{ mt: '2px', mr: '4px', float: 'right' }}>
          <StyledButton onClick={handlePrevPage} disabled={true}>
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
