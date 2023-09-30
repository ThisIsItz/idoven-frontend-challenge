import { Button } from '@mui/material'
import { MouseEvent, ReactNode } from 'react'
import { COLORS } from '../utils/colors'

interface StyledButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

export default function StyledButton({
  onClick,
  children,
  props
}: StyledButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        color: COLORS.blue,
        border: `1px solid ${COLORS.blue}`,
        float: 'left',
        mt: '2px',
        ml: '10px',
        '&:hover': {
          border: `1px solid ${COLORS.darkBlue}`,
          color: COLORS.darkBlue
        }
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}
