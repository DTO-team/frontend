import { Container, Grid } from '@material-ui/core';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getTopicDetail } from 'redux/slices/topic';
import { RootState } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import useSettings from '../../../hooks/useSettings';
import TopicInformation from './TopicInformation';
import { ITopicDetail } from '../../../@types/topic';

const topicDetailInit: ITopicDetail = {
  topicId: '',
  topicName: '',
  description: '',
  companyDetail: undefined,
  lecturersDetails: []
};

const TopicDetail = () => {
  const { topicId } = useParams();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { topic } = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState(false);

  //   if (!TopicDetail) return <Page404 />;

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await getTopicDetail(topicId);
    }
    getData();
    setIsLoading(false);
  }, [topicId]);

  return (
    <Page title="Topic Detail | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Topic Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Topic List', href: PATH_DASHBOARD.fptuCapstone.topics },
            { name: 'Topic detail' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <TopicInformation isLoading={true} topicDetail={topic.topicDetail} />
          </Grid>

          <Grid item container xs={5}>
            <Grid item xs={12}>
              <TopicInformation isLoading={isLoading} topicDetail={topic.topicDetail} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TopicInformation isLoading={isLoading} topicDetail={topic.topicDetail} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default TopicDetail;
