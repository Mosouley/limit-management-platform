import * as XLSX from 'xlsx';

export const parseExcelFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Transform the data to match our Limit interface
        const transformedData = jsonData.map((row: any) => ({
          counterparty: row.counterparty || row.Counterparty || '',
          limitType: row.limitType || row['Limit Type'] || '',
          amount: Number(row.amount || row.Amount || 0),
          currency: row.currency || row.Currency || 'USD',
          startDate: row.startDate || row['Start Date'] || new Date().toISOString().split('T')[0],
          endDate: row.endDate || row['End Date'] || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: row.status || row.Status || 'active',
          notes: row.notes || row.Notes || ''
        }));

        resolve(transformedData);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please ensure the file format is correct.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
};

export const validateExcelFile = (file: File): boolean => {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/octet-stream' // Some systems may use this type for .xlsx files
  ];
  return validTypes.includes(file.type);
};