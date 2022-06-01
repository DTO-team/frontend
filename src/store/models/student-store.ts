import axiosClient from 'utils/api/api-client';

const studentApi = {
  getStudentDetai: (payload: any) => {
    const { token } = payload;
    const url = `students/B5669405-021A-4A33-B0D5-78B10B586A93`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default studentApi;
