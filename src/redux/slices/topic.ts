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
  topicDetail: ITopicDetail;
};

const initialState: TopicState = {
  isLoading: false,
  error: false,
  topicList: [],
  topicDetail: {
    topicId: '',
    topicName: '',
    description: '',
    companyDetail: undefined,
    lecturersDetails: []
  }
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
    },

    setTopicDetail(state, action) {
      state.isLoading = false;
      state.topicDetail = action.payload;
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

export async function getTopicDetail(topicId: string) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/v1/topics/${topicId}`);
    dispatch(slice.actions.setTopicDetail(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}
