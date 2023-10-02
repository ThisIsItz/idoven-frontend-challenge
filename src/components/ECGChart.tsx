import React, { useState } from 'react'
import ECGChartChild from './ECGChartChild'

function ECGChartParent({ data, currentPage }) {
  const start = currentPage === 1 ? 1 : (currentPage - 1) * 10000
  const end = currentPage === 1 ? 10000 : currentPage * 10000

  const trimmedData = data.slice(start, end)

  return (
    <div>
      <ECGChartChild trimmedData={trimmedData} />
    </div>
  )
}

export default ECGChartParent
