import React from 'react';
import axiosConfig from 'utils/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../slices/counterSlice';
import { selectCounterValue } from 'selectors/counter';

const Counter: React.FC = () => {
  console.log('Counter');
  const { value } = useSelector(selectCounterValue);
  const dispatch = useDispatch();

  const handleGetExampleData = async () => {
    const results = await axiosConfig.get('/pokemon/bulbasaur');
    console.log(results);
  };

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button aria-label="Increment value" onClick={() => handleGetExampleData()}>
          Call
        </button>
        <span>{value}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default React.memo(Counter);
