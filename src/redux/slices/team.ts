import filter from 'lodash/filter';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { TeamManager } from '../../@types/team';
// ----------------------------------------------------------------------

type TeamState = {
  isLoading: boolean;
  error: boolean;
  teamList: TeamManager[];
};

const initialState: TeamState = {
  isLoading: false,
  error: false,
  teamList: []
};

const slice = createSlice({
  name: 'team',
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
    getTeamListSuccess(state, action) {
      state.isLoading = false;
      state.teamList = action.payload;
    },

    // DELETE USERS
    deleteTeam(state, action) {
      const deleteTeam = filter(state.teamList, (team) => team.teamId !== action.payload);
      state.teamList = deleteTeam;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTeamList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/teams');
      dispatch(slice.actions.getTeamListSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
