'use client'
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { setData } from '../../store/inventorySlice';
import { InventoryItem } from '@/utils/types';


const REQUIRED_KEYS = ['Product', 'Stock Quantity', 'Status', 'Price', 'Fulfillment Center'];

const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return; // Handle case where no file is selected
    }

    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      let parsedData: InventoryItem[] = [];

      if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        parsedData = XLSX.utils.sheet_to_json(sheet) as InventoryItem[];
      } else if (fileType === 'text/csv') {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            parsedData = result.data as InventoryItem[];
          },
        });
      }

      // Validate that parsed data contains required keys
      const isValidData = parsedData.every(item => 
        REQUIRED_KEYS.every(key => key in item)
      );

      if (isValidData) {
        dispatch(setData(parsedData));
      } else {
        console.error('Uploaded file does not contain required keys:', REQUIRED_KEYS);
        alert('Uploaded file is missing required keys. Please check the file format.');
      }
    };

    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
