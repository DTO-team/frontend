export enum AuthorizeRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER'
}

export enum SemesterStatus {
  PREPARING = 1,
  ON_GOING = 2,
  ENDED = 3
}

export enum TeamApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ReportActionType {
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_INPROGRESS = 'TASK_INPROGRESS',
  NEXT_WEEK_TASK = 'NEXT_WEEK_TASK',
  URGENT_ISSUE = 'URGENT_ISSUE',
  SELF_ASSESSMENT = 'SELF_ASSESSMENT'
}
