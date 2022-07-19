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

export type MentorDetail = {
  id: string;
  fullName: string;
};
export type TeamManager = {
  teamId: string;
  teamName: string;
  leader: LeaderDetail;
  totalMember: Number;
  mentors: MentorDetail[];
  members?: StudentManager[];
  projectId?: string;
  isApplicationApproved?: boolean;
};
