import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

export default function ECGChart({ data }) {
  const canvasRef = useRef()

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
            borderColor: 'blue',
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
          }
        }
      }
    })

    return () => {
      chart.destroy()
    }
  }, [data])

  return <canvas ref={canvasRef} width={1000} height={600} />
}
