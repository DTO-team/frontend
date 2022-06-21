// ----------------------------------------------------------------------

import { TeamManager } from './team';

export type StudentManager = {
  id: string;
  teamId: string;
  email: string;
  userName: string;
  fullName: string;
  teamDetail?: TeamManager;
  code: string;
  semester: 'SPRING' | 'FALL' | ' SUMMER';
  role: 'STUDENT';
  statusId: Number;
};
