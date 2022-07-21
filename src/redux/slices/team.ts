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
  teamDetail: any;
  topic?: any;
};

const initialState: TeamState = {
  isLoading: false,
  error: false,
  teamList: [],
  teamDetail: null,
  topic: null
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

    // GET MANAGE USERS
    getTeamDetailSuccess(state, action) {
      state.isLoading = false;
      state.teamDetail = action.payload;
    },

    // GET MANAGE USERS
    getTeamTopicSuccess(state, action) {
      state.isLoading = false;
      state.topic = action.payload;
    },

    // DELETE USERS
    deleteTeam(state, action) {
      const deleteTeam = filter(state.teamList, (team) => team.teamId !== action.payload);
      state.teamList = deleteTeam;
    },
    clearTeamDetail(state) {
      state.teamDetail = null;
    },
    clearTeamTopicDetail(state) {
      state.topic = null;
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

export function clearTeamDetail() {
  dispatch(slice.actions.clearTeamDetail());
}

export function getTeamDetail(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/v1/teams/${id}`);
      dispatch(slice.actions.getTeamDetailSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function clearTeamTopicDetail() {
  dispatch(slice.actions.clearTeamTopicDetail());
}

export function getTeamTopicDetail(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/v1/projects/${id}`);
      dispatch(slice.actions.getTeamTopicSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function getTeamReports(payload: any) {
  try {
    const response = await axios.get(`v1/teams/${payload?.teamId}/reports?week=${payload?.week}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getTeamCouncils(teamId: any) {
  try {
    const response = await axios.get(`v1/teams/${teamId}/council`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function createTeamReport(payload: any) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post(`v1/teams/${payload.teamId}/reports`, payload);
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    console.log(error);
  }
}

export async function createReportFeedback(payload: any) {
  const newPayload = {
    op: 'add',
    path: '/feedback',
    value: payload.value || ''
  };
  try {
    const response = await axios.patch(
      `v1/teams/${payload.teamId}/reports/${payload.reportId}`,
      newPayload
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
