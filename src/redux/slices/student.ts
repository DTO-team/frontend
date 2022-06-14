import filter from 'lodash/filter';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { StudentManager } from '../../@types/student';
// ----------------------------------------------------------------------

type StudentState = {
  isLoading: boolean;
  error: boolean;
  studentList: StudentManager[];
};

const initialState: StudentState = {
  isLoading: false,
  error: false,
  studentList: []
};

const slice = createSlice({
  name: 'student',
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

    // GET MANAGE USERS
    getStudentListSuccess(state, action) {
      state.isLoading = false;
      state.studentList = action.payload;
    },

    // DELETE USERS
    deleteStudent(state, action) {
      const deleteStudent = filter(state.studentList, (student) => student.id !== action.payload);
      state.studentList = deleteStudent;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getStudentList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/students');
      dispatch(slice.actions.getStudentListSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
