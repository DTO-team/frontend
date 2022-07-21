import filter from 'lodash/filter';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { TeamManager } from '../../@types/team';
import { ICriteria } from '../../@types/criterion';
// ----------------------------------------------------------------------

type TeamState = {
  isLoading: boolean;
  error: boolean;
  criterionList: ICriteria[];
};

const initialState: TeamState = {
  isLoading: false,
  error: false,
  criterionList: []
};

const slice = createSlice({
  name: 'criterion',
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
    getCriterionListSuccess(state, action) {
      state.isLoading = false;
      state.criterionList = action.payload;
    },
    clearCriterionDetail(state) {
      state.criterionList = [];
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
      const response = await axios.get('/v1/criterions');
      dispatch(slice.actions.getCriterionListSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function clearTeamDetail() {
  dispatch(slice.actions.clearCriterionDetail());
}
