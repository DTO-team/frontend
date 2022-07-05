import { Container, Grid } from '@material-ui/core';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
// hooks
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTeamByStudentId } from 'redux/slices/student';
import { RootState } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { AuthorizeRole } from 'utils/enum-utils';
import useSettings from '../../../hooks/useSettings';
import WeeklyReportList from '../report/WeeklyReportList';
import MatchedTopicSection from './MatchedTopicSection';
import ProjectTeamMemberList from './ProjectTeamMemberList';
import TeamInformationSection from './TeamInformationSection';
import { getTopicDetail } from 'redux/slices/topic';

const ProjectDetail = () => {
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const { student } = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(false);

  //   if (!ProjectDetail) return <Page404 />;

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      if (user?.role === AuthorizeRole.STUDENT) {
        const studentTeam = await getTeamByStudentId(user?.id);
      }
    }
    getData();
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    async function getProject() {
      if (user?.role === AuthorizeRole.STUDENT) {
        if (student.studentTeam.isApplicationApproved) {
          await getTopicDetail(student.studentTeam.projectId);
        }
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
              <MatchedTopicSection isLoading={false} />
            </Grid>
            <Grid item xs={12}>
              <WeeklyReportList />
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
