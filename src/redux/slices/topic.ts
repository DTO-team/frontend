import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import { ITopicDetail } from '../../@types/topic';
import axios from '../../utils/axios';
// ----------------------------------------------------------------------

type TopicState = {
  isLoading: boolean;
  error: boolean;
  topicList: ITopicDetail[];
};

const initialState: TopicState = {
  isLoading: false,
  error: false,
  topicList: []
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
    },

    setTopicList(state, action) {
      state.isLoading = false;
      state.topicList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTopicList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/v1/topics');
      dispatch(slice.actions.setTopicList(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
