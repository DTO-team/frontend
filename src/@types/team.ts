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
export type TeamManager = {
  teamId: string;
  teamName: string;
  leader: LeaderDetail;
  totalMember: Number;
  members?: StudentManager[];
  projectId?: string;
  isApplicationApproved?: boolean;
};
