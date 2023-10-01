import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Tooltip } from '@mui/material'

interface InfoTooltipProps {
  title: string
}

export default function InfoTooltip({ title }: InfoTooltipProps) {
  return (
    <Tooltip title={title}>
      <InfoOutlinedIcon />
    </Tooltip>
  )
}
