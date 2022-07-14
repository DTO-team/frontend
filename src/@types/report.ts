import { IFeedback } from './feedback';
import { ISemesterWeek } from './management';
import { StudentManager } from './student';

export interface IReport {
  id: string;
  projectId: string;
  isTeamReport: boolean;
  reporter: StudentManager;
  completedTasks: string;
  inProgressTasks: string;
  nextWeekTasks: string;
  urgentIssues: string;
  selfAssessments: string;
  feedback: IFeedback[];
  week: ISemesterWeek;
  reportEvidences: IReportEvidences[];
}

export interface IReportEvidences {
  id: string;
  url: string;
  name: string;
  reportId: string;
}
