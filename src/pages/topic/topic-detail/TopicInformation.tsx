import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
import { Icon } from '@iconify/react';
// material
import alignLeftOutlined from '@iconify/icons-ant-design/align-left-outlined';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import { Card, CardHeader, Divider, Link, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import _ from 'lodash';
import { ITopicDetail } from '../../../@types/topic';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}));

interface ITopicInformationProps {
  topicDetail: ITopicDetail;
  isLoading: boolean;
}

// ----------------------------------------------------------------------
export default function TopicInformation({ topicDetail, isLoading }: ITopicInformationProps) {
  const firstMentor = _.first(topicDetail.lecturersDetails);

  return (
    <Card>
      <CardHeader title="Topic information" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Divider />

        <Stack direction="row">
          <IconStyle icon={alignLeftOutlined} />
          <Typography variant="body1">
            Topic name: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary">
              {topicDetail?.topicName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body1">
            Company: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary">
              {topicDetail.companyDetail ? topicDetail.companyDetail.fullName : 'No company'}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={userOutlined} />
          <Typography variant="body1">
            Mentor: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary">
              {firstMentor ? firstMentor.fullName : 'No mentor'}
            </Link>
          </Typography>
        </Stack>

        <Divider />
        <Stack direction="row">
          <Typography variant="body1">
            <b>Description:</b>
            <Typography component="div" variant="body1" color="text.primary">
              {topicDetail.description}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
