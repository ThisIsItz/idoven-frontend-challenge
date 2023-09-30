import { useDataContext } from '../DataContext'
import ECGChart from './ECGChart'
import Loader from './Loader'

export default function ECG() {
  const { data, currentPage, handlePrevPage, handleNextPage } = useDataContext()

  if (data.length > 1) {
    return (
      <div>
        <div>
          <ECGChart data={data} />
        </div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Move left
        </button>
        <button onClick={handleNextPage}>Move right</button>
      </div>
    )
  }
  return <Loader />
}
