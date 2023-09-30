import './App.css'
import Header from './components/Header'
import ECG from './components/ECG'
import { Box } from '@mui/material'

function App() {
  return (
    <Box sx={{ h: 'auto' }}>
      <Header />
      <ECG />
    </Box>
  )
}

export default App
