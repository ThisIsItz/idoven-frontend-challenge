import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Tooltip } from '@mui/material'

export default function InfoTooltip({ title }: { title: string }) {
  return (
    <Tooltip title={title}>
      <InfoOutlinedIcon />
    </Tooltip>
  )
}
