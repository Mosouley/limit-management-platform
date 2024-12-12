export const parseExcelFile = async (file: File): Promise<any[]> => {
  // This is a mock implementation - in a real app you'd use a library like xlsx
  // to actually parse the Excel file
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Mock successful parsing
      resolve([
        {
          counterparty: "Sample Corp",
          limitType: "type1",
          amount: 100000,
          currency: "USD",
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "active",
          notes: "Imported from Excel"
        }
      ]);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const validateExcelFile = (file: File): boolean => {
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ];
  return validTypes.includes(file.type);
};