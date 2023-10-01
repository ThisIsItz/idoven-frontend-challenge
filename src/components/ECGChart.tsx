import { Box } from '@mui/material'
import { Chart } from 'chart.js/auto'
import { useEffect, useRef } from 'react'
import { COLORS } from '../utils/colors'
import { DataProps } from '../utils/types'
import StyledButton from './StyledButton'

interface ECGChartProps {
  data: DataProps[]
}

export default function ECGChart({ data }: ECGChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const trimmedData = data.slice(1)
    const timeValues = trimmedData.map((d) => parseFloat(d.time))
    const ecgValues = trimmedData.map((d) => parseFloat(d.value))

    const chartConfig = {
      type: 'line',
      data: {
        labels: timeValues,
        datasets: [
          {
            label: 'ECG Data',
            data: ecgValues,
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
            display: false
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.1
              },
              pinch: {
                enabled: true
              },
              mode: 'xy'
            },
            pan: {
              enabled: true,
              mode: 'xy',
              threshold: 10
            }
          }
        }
      }
    }

    const chart = new Chart(ctx, chartConfig)
    chartRef.current = chart

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data])

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  return (
    <Box display="inline" data-testid="ecg-chart">
      <Box sx={{ cursor: 'all-scroll' }}>
        <canvas ref={canvasRef} width={900} height={500} />
      </Box>
      <StyledButton onClick={handleResetZoom}>Reset Zoom</StyledButton>
    </Box>
  )
}
