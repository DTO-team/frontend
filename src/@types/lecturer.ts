// ----------------------------------------------------------------------

export enum Role {
  LECTURER,
  STUDENT,
  MENTOR,
  null
}

export type Department = {
  id: string;
  name: number;
  code: string;
};

export type LecturerManager = {
  department: Department;
  email: string;
  fullName: string;
  id: string;
  role: 'LECTURER' | 'ADMIN' | 'STUDENT' | null;
  userName: string;
  statusId?: Number;
};
