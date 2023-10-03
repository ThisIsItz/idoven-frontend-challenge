import { Box, CircularProgress } from '@mui/material'
import { COLORS } from '../../utils/colors'

interface LoaderProps {
  text?: string
}

export default function Loader({ text }: LoaderProps) {
  return (
    <Box sx={{ display: 'block', justifyContent: 'center', my: 'auto' }}>
      <CircularProgress sx={{ color: COLORS.blue }} />
      {text && (
        <Box mt="20px" fontSize="20px" fontWeight="500" color={COLORS.blue}>
          {text}
        </Box>
      )}
    </Box>
  )
}
