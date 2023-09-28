import { useDataContext } from '../DataContext';

export default function ECG(){
    const { data, currentPage, handlePrevPage, handleNextPage } = useDataContext();

    console.log('data', data)
    if(data){
        return (
            <div>
                 <ul>
              {data.map((item, index) => (
                <li key={index}>
                  Column 1: {item.time}, Column 2: {item.value}
                </li>
              ))}
            </ul>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
          );
    }
 
  }

