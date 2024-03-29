import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { ICriteria } from '../../@types/criterion';
// ----------------------------------------------------------------------

type CriteriaState = {
  isLoading: boolean;
  error: boolean;
  criterionList: ICriteria[];
};

const initialState: CriteriaState = {
  isLoading: false,
  error: false,
  criterionList: []
};
const slice = createSlice({
  name: 'criteria',
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

export async function getCriteriaList() {
  try {
    const response: ICriteria[] = await axios.get(`/v1/criterions`);
    return response;
  } catch (error) {}
}

export function getCriterionList() {
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
