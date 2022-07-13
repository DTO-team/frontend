import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import { ITopicDetail } from '../../@types/topic';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type PropjectState = {
  isLoading: boolean;
  error: boolean;
};

const initialState: PropjectState = {
  isLoading: false,
  error: false
};

const slice = createSlice({
  name: 'topic',
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

export async function getProjectDetail(projectId: string | undefined) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/v1/projects/${projectId}`);
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}
