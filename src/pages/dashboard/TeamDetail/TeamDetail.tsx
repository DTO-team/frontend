import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { Container, Card, Grid } from '@material-ui/core';
// hooks
import { RootState, useDispatch, useSelector } from 'redux/store';
import useSettings from '../../../hooks/useSettings';
import { PATH_DASHBOARD } from 'routes/paths';
import TeamInformation from './TeamInfomation';
import TeamMemberList from './TeamMemberList';
import TeamMentor from './TeamMentor';
import Page404 from 'pages/Page404';
import { clearTeamDetail, getTeamDetail } from 'redux/slices/team';
import { getLecturerList } from 'redux/slices/lecturer';

const TeamDetail = () => {
  let { id } = useParams();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { teamDetail } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(getTeamDetail(id));
    return () => {
      clearTeamDetail();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(getLecturerList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamDetail]);

  //   if (!teamDetail) return <Page404 />;

  return (
    <Page title="Team Detail | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Team List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Teams', href: PATH_DASHBOARD.fptuCapstone.teams },
            { name: 'Team detail' }
          ]}
        />
        {teamDetail && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TeamMemberList teamDetail={teamDetail} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TeamInformation teamDetail={teamDetail} />
              <br />
              <TeamMentor teamDetail={teamDetail} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default TeamDetail;
