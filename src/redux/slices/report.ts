import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';
import { Semester } from '../../@types/management';
// utils
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type ReportState = {
  isLoading: boolean;
  error: boolean;
  semesters: Semester[];
  selectedSemester: Semester;
};

const initialState: ReportState = {
  isLoading: false,
  error: false,
  semesters: [],
  selectedSemester: {
    id: '',
    year: 0,
    season: '',
    status: 0
  }
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

    setSemesters(state, action) {
      state.isLoading = false;
      state.semesters = action.payload;
    },

    setSelectedSemester(state, action) {
      state.isLoading = false;
      state.selectedSemester = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setSelectedSemester } = slice.actions;

// ----------------------------------------------------------------------

export async function createReport(payload: any) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.post(`v1/reports/${payload.projectId}`, payload);
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    console.log(error);
  }
}
