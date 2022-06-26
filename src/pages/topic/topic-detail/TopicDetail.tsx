import { Container, Grid } from '@material-ui/core';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
// hooks
import { PATH_DASHBOARD } from 'routes/paths';
import useSettings from '../../../hooks/useSettings';
import TopicInformation from './TopicInformation';

const TopicDetail = () => {
  /* let { id } = useParams(); */
  const { themeStretch } = useSettings();
  /* const dispatch = useDispatch(); */
  /* const {} = useSelector((state: RootState) => state.team); */

  //   if (!TopicDetail) return <Page404 />;

  return (
    <Page title="Team Detail | DTO">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Team List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Topic List', href: PATH_DASHBOARD.fptuCapstone.topics },
            { name: 'Topic detail' }
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <TopicInformation topicDetails={{}} />
          </Grid>

          <Grid item container xs={5}>
            <Grid item xs={12}>
              <TopicInformation topicDetails={{}} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TopicInformation topicDetails={{}} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default TopicDetail;
