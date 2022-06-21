import { createSlice } from '@reduxjs/toolkit';
import filter from 'lodash/filter';
import { dispatch } from '../store';
import { StudentManager } from './../../@types/student';
// utils
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type StudentState = {
  isLoading: boolean;
  error: boolean;
  studentList: StudentManager[];
  student: StudentManager;
};

const studentInit: StudentManager = {
  code: '',
  email: '',
  fullName: '',
  teamId: '',
  id: '',
  role: 'STUDENT',
  semester: 'SPRING',
  statusId: 0,
  userName: ''
};

const initialState: StudentState = {
  isLoading: false,
  error: false,
  studentList: [],
  student: studentInit
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

    setStudent(state, action) {
      state.isLoading = false;
      state.student = action.payload;
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

export function getStudentProfile(studentId: string | undefined) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/v1/students/${studentId}`);
      dispatch(slice.actions.setStudent(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
