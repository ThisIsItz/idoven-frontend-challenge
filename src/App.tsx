import './App.css'
import Header from './components/Header'
import ECG from './components/ECG'
import { Box } from '@mui/material'
import ZoomPlugin from 'chartjs-plugin-zoom'
import { Chart } from 'chart.js'

// Register the zoom plugin
Chart.register(ZoomPlugin)

function App() {
  return (
    <Box sx={{ h: 'auto' }}>
      <Header />
      <ECG />
    </Box>
  )
}

export default App
