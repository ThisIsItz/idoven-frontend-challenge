import { Chart } from 'chart.js/auto'
import { useEffect, useRef } from 'react'
import { COLORS } from '../utils/colors'
import { Box, Button } from '@mui/material'

export default function ECGChart({ data }) {
  const canvasRef = useRef()
  const chartRef = useRef()

  useEffect(() => {
    const trimmedData = data.slice(1)

    const timeValues = trimmedData.map((d) => parseFloat(d.time))
    const valueValues = trimmedData.map((d) => parseFloat(d.value))

    const ctx = canvasRef.current.getContext('2d')

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeValues,
        datasets: [
          {
            label: 'ECG Data',
            data: valueValues,
            borderColor: COLORS.blue,
            borderWidth: 1,
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true
          }
        },
        animation: {
          duration: 0
        },
        plugins: {
          legend: {
            display: false // Hide the legend
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            }
          }
        }
      }
    })

    chartRef.current = chart

    return () => {
      chart.destroy()
    }
  }, [data])

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  return (
    <>
      <Box>
        <canvas ref={canvasRef} width={900} height={500} />
      </Box>
      <Button
        variant="outlined"
        sx={{ color: COLORS.blue, border: `1px solid ${COLORS.blue}` }}
        onClick={handleResetZoom}
      >
        Reset Zoom
      </Button>
    </>
  )
}
