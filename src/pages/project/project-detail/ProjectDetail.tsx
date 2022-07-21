import { Container, Grid } from '@material-ui/core';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
// hooks
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTeamById, getTeamByStudentId } from 'redux/slices/student';
import { RootState } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { AuthorizeRole } from 'utils/enum-utils';
import useSettings from '../../../hooks/useSettings';
import WeeklyReportList from '../report/WeeklyReportList';
import MatchedTopicSection from './MatchedTopicSection';
import ProjectTeamMemberList from './ProjectTeamMemberList';
import TeamInformationSection from './TeamInformationSection';
import { getTopicDetail } from 'redux/slices/topic';
import { TeamManager } from '../../../@types/team';
import { getProjectDetail } from 'redux/slices/project';
import { getTeamCouncils } from 'redux/slices/team';
import ProjectTeamCouncilSection from './ProjectTeamCouncilSection';
import { useParams } from 'react-router';

const StudentTeamInit: TeamManager = {
  teamId: '',
  teamName: '',
  leader: {
    id: '',
    code: '',
    fullName: '',
    email: '',
    role: '',
    semester: '',
    status: '',
    avatarUrl: ''
  },
  mentors: [],
  totalMember: 0
};

const ProjectDetail = () => {
  let { id } = useParams();
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { student } = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudentTeam, setCurrentStudentTeam] = useState<any>();
  const [currentTeamTopic, setCurrentTeamTopic] = useState<any>();
  const [currentTeamCouncil, setCurrentTeamCouncil] = useState<any>([]);

  //   if (!ProjectDetail) return <Page404 />;

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      if (user?.role !== AuthorizeRole.ADMIN) {
        let studentTeam: any;
        if (user?.role === AuthorizeRole.STUDENT) {
          studentTeam = await getTeamByStudentId(user?.id);
        } else {
          studentTeam = await getTeamById(id);
        }
        setCurrentStudentTeam(studentTeam);
        const teamCouncil: any = await getTeamCouncils(studentTeam.teamId);
        setCurrentTeamCouncil(teamCouncil);
      }
    }
    getData();
    setIsLoading(false);
  }, [id, user]);

  useEffect(() => {
    setIsLoading(true);
    async function getProject() {
      if (student.studentTeam.isApplicationApproved) {
        const response: any = await getProjectDetail(student.studentTeam.projectId);
        setCurrentTeamTopic(response.topicsResponse);
      }
    }
    getProject();
    setIsLoading(false);
  }, [student, user]);

  return (
    <Page title="Project Detail | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Project Detail"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Project detail' }]}
        />
        <Grid container spacing={3}>
          <Grid item container xs={8} spacing={2}>
            <Grid item xs={12}>
              <MatchedTopicSection
                currentStudentTeam={currentStudentTeam}
                currentTeamTopic={currentTeamTopic}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12}>
              <WeeklyReportList currentStudentTeam={currentStudentTeam} />
            </Grid>
            <Grid item xs={12}>
              <ProjectTeamCouncilSection
                currentTeamCouncil={currentTeamCouncil}
                isLoading={false}
              />
            </Grid>
          </Grid>

          <Grid item container xs={4}>
            <Grid item xs={12}>
              <TeamInformationSection isLoading={false} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <ProjectTeamMemberList teamDetail={student.studentTeam} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProjectDetail;
