import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
import { Icon } from '@iconify/react';
// material
import alignLeftOutlined from '@iconify/icons-ant-design/align-left-outlined';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import { Card, CardHeader, Divider, Link, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}));

// ----------------------------------------------------------------------
interface ITopicInformationProps {
  topicDetails: any;
}
export default function TopicInformation({ topicDetails }: ITopicInformationProps) {
  return (
    <Card>
      <CardHeader title="Team information" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Divider />

        <Stack direction="row">
          <IconStyle icon={alignLeftOutlined} />
          <Typography variant="body1">
            Topic name: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {topicDetails.topicName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body1">
            Company: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {topicDetails.companyDetail?.fullName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={userOutlined} />
          <Typography variant="body1">
            Mentor: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary"></Link>
          </Typography>
        </Stack>

        <Divider />
        <Stack direction="row">
          <Typography variant="body1">
            <b>Description:</b>
            <Typography component="div" variant="body1" color="text.primary">
              {topicDetails.description}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
