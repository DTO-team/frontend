import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
import { Icon } from '@iconify/react';
// material
import alignLeftOutlined from '@iconify/icons-ant-design/align-left-outlined';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import fileOutline from '@iconify/icons-eva/file-outline';
import { Card, CardHeader, Divider, Link, Stack, Typography, useTheme } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { sentenceCase } from 'change-case';
import Label from 'components/Label';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}));

interface ITeamInformationSectionProps {
  isLoading: boolean;
  project: any;
}

// ----------------------------------------------------------------------
export default function TeamInformationSection({ isLoading }: ITeamInformationSectionProps) {
  const { studentTeam } = useSelector((state: RootState) => state.student);
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Team information" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Divider />

        <Stack direction="row">
          <IconStyle icon={alignLeftOutlined} />
          <Typography variant="body1">
            Team name: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary">
              {studentTeam.teamName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={fileOutline} />
          <Typography variant="body1">
            Application Status: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary">
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={studentTeam.isApplicationApproved ? 'success' : 'warning'}
              >
                {sentenceCase(studentTeam.isApplicationApproved ? 'Approved' : 'Pending')}
              </Label>
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body1">
            Company: &nbsp;
            <Link component="span" variant="subtitle1" color="text.primary"></Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={userOutlined} />
          <Typography variant="body1">
            Mentor: &nbsp;
            {studentTeam.mentors.map((mentor) => 
              <Link key={mentor.id} component="span" variant="subtitle1" color="text.primary">
                {mentor.fullName}
              </Link>
            )}
          </Typography>
        </Stack>

        <Divider />
        <Stack direction="row">
          <Typography variant="body1">
            <b>Description:</b>
            <Typography variant="body1" color="text.primary">
              SU22-SWD-SE1503-UniBean-Mentor-Mentee Connect
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
