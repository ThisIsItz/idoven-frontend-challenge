import './App.css'
import Header from './components/Header'
import ECGWrapper from './components/ECGWrapper'
import { Box } from '@mui/material'
import ZoomPlugin from 'chartjs-plugin-zoom'
import { Chart } from 'chart.js'

Chart.register(ZoomPlugin)

function App() {
  return (
    <Box sx={{ h: 'auto' }}>
      <Header />
      <ECGWrapper />
    </Box>
  )
}

export default App
