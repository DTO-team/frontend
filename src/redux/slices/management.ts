import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';
import { ISemesterWeek, Semester } from '../../@types/management';
// utils
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type ManagementState = {
  isLoading: boolean;
  error: boolean;
  semesters: Semester[];
  selectedSemester: Semester;
};

const initialState: ManagementState = {
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

export async function getSemesterList() {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get('v1/semesters');
    dispatch(slice.actions.setSemesters(response));
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    console.log(error);
  }
}

export async function updateSemesterStatus(payload: any) {
  const { id } = payload;
  try {
    const response = await axiosInstance.put(`v1/semesters/${id}`, payload);
    await getSemesterList();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentWeekOfSemester(semesterId: any) {
  try {
    const response: ISemesterWeek = await axiosInstance.get(
      `v1/semesters/${semesterId}/weeks/current`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllWeeksOfSemester(semesterId: any) {
  try {
    const response: ISemesterWeek[] = await axiosInstance.get(`v1/semesters/${semesterId}/weeks`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getEvaluationSessionBySemesterId(semesterId: any) {
  try {
    const response: any = await axiosInstance.get(`v1/evaluationsessions?semesterId=${semesterId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateEvaluationsCouncil(payload: any) {
  try {
    const response: any = await axiosInstance.put(
      `v1/evaluationsessions/${payload.evaluationId}`,
      payload
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
