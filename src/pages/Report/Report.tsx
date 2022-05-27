import Counter from 'features/counter/Counter';
import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  height: '500vh',
});

const Report: React.FC = () => {
  return (
    <Wrapper>
      <h1>Report</h1>
      <Counter />
    </Wrapper>
  );
};

export default Report;
