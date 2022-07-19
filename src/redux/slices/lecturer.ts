import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { LecturerManager } from '../../@types/lecturer';
// ----------------------------------------------------------------------

type LecturerState = {
  isLoading: boolean;
  error: boolean;
  lecturerList: LecturerManager[];
};

const initialState: LecturerState = {
  isLoading: false,
  error: false,
  lecturerList: []
};

const slice = createSlice({
  name: 'lecturer',
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
    getLecturerListSuccess(state, action) {
      state.isLoading = false;
      state.lecturerList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export async function getLecturerList() {
  try {
    const response = await axios.get('/v1/lecturers');
    dispatch(slice.actions.getLecturerListSuccess(response));
    return response;
  } catch (error) {
    console.log(error);
  }
}
