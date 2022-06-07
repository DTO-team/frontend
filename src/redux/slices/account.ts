import { createSlice } from '@reduxjs/toolkit';
import { AccountSession } from '../../@types/account';
// utils
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type AccountState = {
  isLoading: boolean;
  error: boolean;
  accountSession: AccountSession;
};

const initialState: AccountState = {
  isLoading: false,
  error: false,
  accountSession: { accessToken: '' }
};

const slice = createSlice({
  name: 'account',
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

    // SET TOKEN
    setAccessToken(state, action) {
      state.isLoading = false;
      state.accountSession = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {} = slice.actions;

// ----------------------------------------------------------------------

export function getAccessToken(accessToken: AccountSession) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setAccessToken(accessToken));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
