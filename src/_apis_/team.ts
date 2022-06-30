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

export const callAPIForCreateNewTeam = async (teamName: string): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.post('/v1/teams', {
      teamName
    });
    return { statusCode: 201, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const callAPIForUpdateTeamMentor = async (data: any): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.patch('/v1/teams/mentor', {
      op: 'add',
      ...data
    });
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const callAPIForJoinTeam = async (
  op: string,
  path: string,
  joinCode: string
): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.patch(`/v1/teams`, {
      op,
      path,
      joinCode
    });
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};
