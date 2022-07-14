import { ICriteria } from './../../@types/criterion';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type CriteriaState = {
  isLoading: boolean;
  error: boolean;
};

const initialState: CriteriaState = {
  isLoading: false,
  error: false
};

const slice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export async function getCriteriaList() {
  try {
    const response: ICriteria[] = await axios.get(`/v1/criterions`);
    return response;
  } catch (error) {}
}
