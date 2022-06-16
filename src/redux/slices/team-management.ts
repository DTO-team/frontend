import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState: any = {
  isLoading: false,
  error: false,
  teamApplications: []
};

const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.teamApplications = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions (use later)
/* export const {} = slice.actions; */

// ----------------------------------------------------------------------

export function getProfile(userId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`v1/users/${userId}`);
      dispatch(slice.actions.getProfileSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
