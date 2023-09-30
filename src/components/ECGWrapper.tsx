import { Box, Button } from '@mui/material'
import { useDataContext } from '../DataContext'
import ECGChart from './ECGChart'
import Loader from './Loader'
import StyledButton from './StyledButton'

export default function ECG() {
  const { data, currentPage, handlePrevPage, handleNextPage } = useDataContext()

  if (data.length > 1) {
    return (
      <div>
        <div>
          <ECGChart data={data} />
        </div>
        <Box sx={{ mt: '2px', mr: '4px', float: 'right' }}>
          <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
            Move left
          </StyledButton>
          <StyledButton onClick={handleNextPage}>Move right</StyledButton>
        </Box>
      </div>
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
