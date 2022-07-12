import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { ProjectDetail } from "../../@types/project";
import axios from "../../utils/axios";

//----------------------------------------------------------------------------------

type ProjectState = {
  isLoading: boolean,
  error: boolean,
  project: ProjectDetail,
}

const projectInit: ProjectDetail = {
 projectId:'',
 teamDetailResponse: {
  teamId:'',
  teamName:'',
  projectId:'',
  totalMember:0,
  isApplicationApproved:false,
  mentors:[],
  members:[],
  leader: {
    id: '',
    email:'',
    code: '',
    fullName: '',
    avatarUrl:'',
    role:'',
    semester:'',
    status: '',
  }
 },
 topicsResponse:{
  topicId:'',
  topicName:'',
  description:'',
  isRegistered: false,
  lecturersDetails:[
    {
      id: '',
      email: '',
      userName: '',
      fullName: '',
      role: '',
      avatarUrl: '',
      status: {
        statusId: 0,
        statusName: ''
      },
      department: {
        id: '',
        name: '',
        code: '',
      }
    }
  ],
  companyDetail:{
    id:'',
    email:'',
    fullName:'',
    userName:'',
    role:'',
    avatarUrl:'',
    status:{
      statusId: 0,
      statusName: ''
    },
  },
 }
}

const initialState: ProjectState = {
  isLoading: false,
  error: false,
  project: projectInit,
};

const slice = createSlice({
  name: 'project',
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

    // GET PROJECT
    setProject(state, action) {
      state.isLoading = false;
      state.project = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

//-----------------------------------------------------------------------------------

export async function getProjectById(projectId: string | undefined) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.get(`/v1/projects/${projectId}`);    
    dispatch(slice.actions.setProject(response));
    return response;
  } catch (error: any) {
    console.error(error);
    dispatch(slice.actions.hasError(error));
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
}

