import { Box, CircularProgress } from '@mui/material'
import { COLORS } from '../utils/colors'

export default function Loader({ text }: { text?: string }) {
  return (
    <Box sx={{ display: 'block', justifyContent: 'center', my: 'auto' }}>
      <CircularProgress sx={{ color: COLORS.blue }} />
      {text && (
        <Box mt="20px" fontSize="20px" color={COLORS.blue}>
          {text}
        </Box>
      )}
    </Box>
  )
}
