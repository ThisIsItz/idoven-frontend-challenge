import { createContext, useContext, useEffect, useState } from 'react';
import JSZip from 'jszip';
import { dataProps } from './utils/types';

const DataContext = createContext({});

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<dataProps[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(50);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data/idoven-data.zip');
        const blob = await response.blob();
        
        const zip = new JSZip();
        await zip.loadAsync(blob);

        let found = false;
        let txtFile;

        zip.forEach((relativePath, zipEntry) => {
          if (!found && zipEntry.name.endsWith('.txt')) {
            txtFile = zipEntry;
            found = true;
          }
        });

        if (txtFile) {
          const contentBlob = await txtFile.async('blob');
          const contentStream = contentBlob.stream();
          let content = '';
          let lineCount = 0;

          const reader = contentStream.getReader();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            content += new TextDecoder().decode(value);

            if (content.includes('\n')) {
              const lines = content.split('\n');
              lineCount += lines.length - 1;

              if (lineCount >= currentPage * itemsPerPage) {
                break;
              }
            }
          }

          const lines = content.split('\n').slice(0, currentPage * itemsPerPage);
          const parsedData = lines.map((line) => {
            const values = line.split(',');
            return {
              time: values[0],
              value: values[1],
            };
          });
          setData(parsedData);
        } else {
          console.error('No text file was found in the ZIP.');
        }
      } catch (error) {
        console.error('Error loading the ZIP file:', error);
      }
    }

    fetchData();
  }, [currentPage, itemsPerPage]);


  return (
    <DataContext.Provider
      value={{ data, setData, currentPage, itemsPerPage, handleNextPage, handlePrevPage }}
    >
      {children}
    </DataContext.Provider>
  );
};