import { Box, CircularProgress } from '@mui/material'

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress sx={{ color: '#39d4c8' }} />
    </Box>
  )
}
