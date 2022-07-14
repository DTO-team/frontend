export type Semester = {
  id: string;
  year: number;
  season: string;
  status: number;
};

export interface ISemesterWeek {
  id: string;
  number: number;
  semesterId: string;
  fromDate: number;
  toDate: number;
  deadline: number;
}
