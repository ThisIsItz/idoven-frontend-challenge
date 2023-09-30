import { Chart } from 'chart.js/auto';
import { useDataContext } from '../DataContext';
import ECGChart from './ECGChart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ECG(){
    const { data, currentPage, handlePrevPage, handleNextPage } = useDataContext();

    console.log('data', data)



    if(data.length > 1){
        return (
            <div>
              <div>
  <ECGChart data={data}/>
</div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Move left
            </button>
            <button onClick={handleNextPage}>Move right</button>
          </div>
          );
    }
    return  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  }

