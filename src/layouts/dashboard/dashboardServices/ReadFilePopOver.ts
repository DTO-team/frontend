import axios from 'utils/axios';
import { AxiosResponse } from 'axios';
interface StatusCode {
  statusCode: Number;
}

interface AxiosResponseChild extends AxiosResponse {
  httpStatus: Number;
}

export const postExcelFileList = async (type: string, data: any): Promise<StatusCode> => {
  try {
    const uri = type === 'studentList' ? '/v1/ongoing-students' : '/v1/topics/list';
    const result: AxiosResponseChild = await axios.post(uri, data);
    return { statusCode: result.httpStatus };
  } catch (error) {
    return { statusCode: 500 };
  }
};
