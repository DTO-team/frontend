import { createSlice } from '@reduxjs/toolkit';
import { Semester } from '../../@types/management';
import axiosInstance from 'utils/axios';
// utils
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type ManagementState = {
  isLoading: boolean;
  error: boolean;
  semesters: Semester[];
};

const initialState: ManagementState = {
  isLoading: false,
  error: false,
  semesters: []
};

const slice = createSlice({
  name: 'management',
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
    },

    // SET TOKEN
    setSemesters(state, action) {
      state.isLoading = false;
      state.semesters = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
/* export const {} = slice.actions; */

// ----------------------------------------------------------------------

export function getSemesterList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get('v1/semesters');
      dispatch(slice.actions.setSemesters(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log(error);
    }
  };
}

export function updateSemesterStatus(payload: any) {
  const { id } = payload;
  return async () => {
    try {
      await axiosInstance.put(`v1/semesters/${id}`, payload);
      dispatch(getSemesterList());
    } catch (error) {
      console.log(error);
    }
  };
}
