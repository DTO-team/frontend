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
  teamDetail: any;
}
export default function TeamInformation({ teamDetail }: TeamInformationProps) {
  console.log(teamDetail);

  return (
    <Card>
      <CardHeader
        title="Team information
"
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Team name: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {teamDetail.teamName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Total member: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {teamDetail.totalMember}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Team leader: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {teamDetail.leader.fullName}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
