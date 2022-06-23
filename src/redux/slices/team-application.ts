import { createSlice } from '@reduxjs/toolkit';
import { TeamApplicationStatus } from 'utils/enum-utils';
import { TeamApplication } from '../../@types/application';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type ApplicationState = {
  isLoading: boolean;
  error: boolean;
  teamApplicationList: TeamApplication[];
};

const initialState: ApplicationState = {
  isLoading: false,
  error: false,
  teamApplicationList: []
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
    },

    setTeamApplicationList(state, action) {
      state.isLoading = false;
      state.teamApplicationList = action.payload;
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

export function getTeamApplicationList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/applications');
      dispatch(slice.actions.setTeamApplicationList(response.data));
      dispatch(slice.actions.hasError(false));
    } catch (error) {
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function updateTeamApplicationStatus(
  action: TeamApplicationStatus | undefined,
  teamApplicationId: string | undefined
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/v1/applications/status?id=${teamApplicationId}`, { op: action });
      dispatch(getTeamApplicationList());
      dispatch(slice.actions.hasError(false));
    } catch (error) {
      dispatch(slice.actions.hasError(true));
    }
  };
}
