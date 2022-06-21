import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@material-ui/core';
import { Box } from '@material-ui/system';
import Avatar from 'components/Avatar';
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

export default function TeamMemberList({ teamDetail }: TeamInformationProps) {
  // const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      <CardHeader title="Team members" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {teamDetail &&
          teamDetail.members.length > 0 &&
          teamDetail.members.map((member: any) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '175px' }}>
                <Avatar displayName={member.fullName} />
                <Box>
                  <h4>{member.fullName}</h4>
                  <Typography variant="body2">{member.code}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body1">{member.email}</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{member.semester}</Typography>
              </Box>
            </Box>
          ))}
      </Stack>
    </Card>
  );
}
