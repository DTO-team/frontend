import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack, Box } from '@material-ui/core';
import FormDialogs from './components/FormDialogs';
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
  return (
    <Card>
      <CardHeader
        title="Team mentor
"
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {teamDetail.mentors && teamDetail.mentors.length && (
          <>
            <Stack direction="row">
              <IconStyle icon={pinFill} />
              <Typography variant="body2">
                Mentor's name: &nbsp;
                {teamDetail.mentors.map((mentor: any, i: Number) => {
                  if (i === teamDetail.mentors.length - 1) {
                    return (
                      <Link component="span" variant="subtitle2" color="text.primary">
                        {mentor.fullName}
                      </Link>
                    );
                  } else {
                    return (
                      <Link component="span" variant="subtitle2" color="text.primary">
                        {mentor.fullName},{' '}
                      </Link>
                    );
                  }
                })}
              </Typography>
            </Stack>
            <Stack>
              <Box sx={{ mt: 0, display: 'flex' }}>
                <FormDialogs
                  teamDetail={teamDetail}
                  id={'update'}
                  buttonContent="Add Mentor"
                  title="Add mentor for team"
                  inputPlaceholder="Team name:"
                  content="Choose mentor for team:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                />
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}
