import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../slices/counterSlice'
import { selectCounterValue } from 'selectors/counter';

const Counter: React.FC = () => {
  const { value } = useSelector(selectCounterValue);
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default Counter;