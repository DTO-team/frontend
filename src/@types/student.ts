import { IDepartment } from './department';
// ----------------------------------------------------------------------

import { TeamManager } from './team';

export type StudentManager = {
  id: string;
  teamId: string;
  email: string;
  userName: string;
  fullName: string;
  code: string;
  semester: 'SPRING' | 'FALL' | ' SUMMER';
  role: 'STUDENT';
  status: {
    statusId: Number;
    statusName: string;
  };
  avatarUrl?: string;
  teamDetail?: TeamManager;
  department?: IDepartment;
};
