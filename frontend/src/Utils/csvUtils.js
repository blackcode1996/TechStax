import csvToJson from 'csvtojson';

export const convertCSVtoJSON = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      try {
        const jsonData = await csvToJson().fromString(csvData);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
