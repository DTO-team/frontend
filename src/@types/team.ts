// ----------------------------------------------------------------------

type leaderDetail = {
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
  leader: leaderDetail;
  totalMember: Number;
};
