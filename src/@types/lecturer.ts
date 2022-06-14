// ----------------------------------------------------------------------

export enum Role {
  LECTURER,
  STUDENT,
  MENTOR,
  null
}

export type LecturerManager = {
  department: string;
  email: string;
  fullName: string;
  id: string;
  role: 'LECTURER' | 'ADMIN' | 'STUDENT' | null;
  userName: string;
  statusId?: Number;
};
