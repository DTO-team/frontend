/* eslint-disable no-restricted-globals */
import axios from 'utils/axios';
import { AxiosResponse } from 'axios';

interface StatusCode {
  statusCode: Number;
  data: any;
}

interface AxiosResponseChild extends AxiosResponse {
  httpStatus: Number;
}

export const callAPIForGetEvaluationsessions = async (): Promise<StatusCode> => {
  let currentSemester = sessionStorage.getItem('currentSemester');
  try {
    const result: AxiosResponseChild = await axios.get(
      `/v1/evaluationsessions?semesterId=${currentSemester && JSON.parse(currentSemester).id}`
    );
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const callAPIForGetAllCouncilOfLecturer = async (
  lecturerId: string
): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.get(`/v1/councils/lecturer/${lecturerId}`);
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const callAPIForGetCouncilDetail = async (councilId: string): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.get(`/v1/councils/${councilId}/projects`);
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};
