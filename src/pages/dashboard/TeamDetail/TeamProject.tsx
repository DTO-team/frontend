import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@material-ui/core';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------
interface TeamInformationProps {
  teamProject: any;
}
export default function TeamProject({ teamProject }: TeamInformationProps) {
  return teamProject && teamProject?.topicsResponse ? (
    <Card>
      <CardHeader title="Team Project" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Project name: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {teamProject.topicsResponse.topicName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Project description: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {teamProject.topicsResponse.description}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  ) : (
    <Card>
      <CardHeader
        title="No project assigned to this team yet!
"
      />
      <br />
    </Card>
  );
}
