import { ICompanyDetail } from './company';
import { LecturerManager } from './lecturer';

export interface ITopicDetail {
  topicId: string;
  topicName: string;
  description: string;
  companyDetail?: ICompanyDetail;
  lecturersDetails?: LecturerManager[];
}
