import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type ApplicationState = {
  isLoading: boolean;
  error: boolean;
};

const initialState: ApplicationState = {
  isLoading: false,
  error: false
};

const slice = createSlice({
  name: 'teamApplication',
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

export function createTeamApplication(teamId: string, topicId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/v1/applications', { teamId, topicId });
      dispatch(slice.actions.hasError(false));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(true));
    }
  };
}
