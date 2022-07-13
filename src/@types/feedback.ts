import { StudentManager } from './student';
export interface IFeedback {
  id: string;
  content: string;
  createdDateTime: number;
  isTeamReport: boolean;
  author: StudentManager;
}
