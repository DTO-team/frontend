import axiosClient from 'utils/api/api-client';

const authenticationApi = {
  signIn: (payload: any) => {
    const url = 'Auth/login';
    return axiosClient.post(url, { ...payload });
  },
};

export default authenticationApi;
