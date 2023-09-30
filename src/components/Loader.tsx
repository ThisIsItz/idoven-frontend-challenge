import { Box, CircularProgress } from '@mui/material'
import { COLORS } from '../utils/colors'

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 'auto' }}>
      <CircularProgress sx={{ color: COLORS.blue }} />
    </Box>
  )
}
