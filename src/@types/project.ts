import { TeamManager } from "./team"

export type ProjectDetail = {
  projectId: string,
  topicsResponse: {
    topicId: string,
    topicName: string,
    description: string,
    isRegistered: boolean,
    companyDetail: {
      id: string,
      email: string,
      userName: string,
      fullName: string,
      role: string,
      avatarUrl: string,
      status: {
        statusId: 0,
        statusName: string
      }
    },
    lecturersDetails: [
      {
        id: string,
        email: string,
        userName: string,
        fullName: string,
        role: string,
        avatarUrl: string,
        status: {
          statusId: 0,
          statusName: string
        },
        department: {
          id: string,
          name: string,
          code: string
        }
      }
    ]
  },
  teamDetailResponse: TeamManager;
}