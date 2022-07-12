import { StudentManager } from './student';
// ----------------------------------------------------------------------

export type LeaderDetail = {
  id: string;
  code: string;
  fullName: string;
  email: string;
  role: string;
  semester: string;
  status: string;
  avatarUrl: string;
};

export type TeamMentor = {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  role: string;
  avatarUrl: string;
  status: {
    statusId: 0;
    statusName: string;
  };
  department: {
    id: string;
    name: string;
    code: string;
  };
};

export type TeamManager = {
  mentors:TeamMentor[];
  teamId: string;
  teamName: string;
  leader: LeaderDetail;
  totalMember: Number;
  members?: StudentManager[];
  projectId?: string;
  isApplicationApproved?: boolean;
};
