import { TeamManager } from "./team";
import { ITopicDetail } from "./topic";

export interface TeamApplication {
  applicationId: string;
  applyTeam: {
    teamId: string;
    teamName: string;
    teamSemesterSeason: string;
    leaderStudent: {
      id: string;
      teamId: string;
      email: string;
      userName: string;
      fullName: string;
      teamDetail: TeamManager;
      code: string;
      semester: string;
      role: string;
      status: string;
    };
  };
  topic: ITopicDetail;
  status: string;
}
