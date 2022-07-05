// material
import { Card, CardHeader, Stack, Typography, useTheme } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { sentenceCase } from 'change-case';
import Avatar from 'components/Avatar';
import Label from 'components/Label';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------
interface IProjectTeamMemberListProps {
  teamDetail: any;
}

export default function ProjectTeamMemberList({ teamDetail }: IProjectTeamMemberListProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader title="Team members" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {teamDetail &&
          teamDetail.members.length > 0 &&
          teamDetail.members.map((member: any) => (
            <Box key={member.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/dashboard/user/profile/${member.id}`)}
              >
                <Avatar displayName={member.fullName} photoURL={member.avatarUrl} />
                <Box>
                  <h4>{member.fullName}</h4>
                  <Typography variant="body2">{member.code}</Typography>
                  {member.id === teamDetail.leader.id && (
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={'error'}
                    >
                      {sentenceCase('Leader')}
                    </Label>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
      </Stack>
    </Card>
  );
}
