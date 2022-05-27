import React from 'react';
import { styled } from '@mui/system';
import * as XLSX from 'xlsx';

const Wrapper = styled('div')({
  height: '500vh',
});

const Excel: React.FC = () => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    const f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = reader.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(dataParse);
    };
    reader.readAsBinaryString(f);
  };

  return (
    <Wrapper>
      <input type="file" onChange={handleFileChange} />
    </Wrapper>
  );
};

export default Excel;
