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

export const createNewCriteria = async (criteria: any): Promise<StatusCode> => {
  const dataRequest = {
    code: criteria.code,
    name: criteria.name,
    evaluation: '-' + criteria.evaluation,
    ...(Boolean(criteria.gradesRequest.length) && {
      gradesRequest: criteria.gradesRequest.map((grade: any) => ({
        level: grade.level,
        minPoint: Number(grade.minPoint),
        maxPoint: Number(grade.maxPoint),
        description: grade.description
      }))
    }),
    ...(Boolean(criteria.questionsRequest.length) && {
      questionsRequest: criteria.questionsRequest.map((question: any) => ({
        priority: question.priority,
        description: question.description,
        subCriteria: question.subCriteria
      }))
    })
  };
  try {
    const result: AxiosResponseChild = await axios.post('/v1/criterions', {
      ...dataRequest
    });
    return { statusCode: 201, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const updateCriteria = async (id: string, criteria: any): Promise<StatusCode> => {
  const dataRequest = {
    name: criteria.name,
    evaluation: criteria.evaluation,
    grades: criteria.gradesRequest.map((grade: any) => ({
      id: grade.id,
      level: grade.level,
      minPoint: Number(grade.minPoint),
      maxPoint: Number(grade.maxPoint),
      description: grade.description
    })),
    questions: criteria.questionsRequest.map((question: any) => ({
      id: question.id,
      priority: question.priority,
      description: question.description,
      subCriteria: question.subCriteria
    }))
  };
  try {
    const result: AxiosResponseChild = await axios.patch(`/v1/criterions?criteriaId=${id}`, {
      ...dataRequest
    });
    return { statusCode: 201, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};

export const deleteCriteria = async (id: string): Promise<StatusCode> => {
  try {
    const result: AxiosResponseChild = await axios.delete(`/v1/criterions?criteriaId=${id}`);
    return { statusCode: 200, data: result };
  } catch (error) {
    return {
      statusCode: error.toString().indexOf('400') === -1 ? 500 : 400,
      data: error
    };
  }
};
