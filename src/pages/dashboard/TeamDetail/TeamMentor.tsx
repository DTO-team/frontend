import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';
// material
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Link, Card, Typography, CardHeader, Stack, Box } from '@material-ui/core';
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
        title="Team mentor
"
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {teamDetail.mentors && teamDetail.mentors.length ? (
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
        ) : (
          <Box sx={{ mt: 0, display: 'flex' }}>
            <LoadingButton type="submit" variant="contained" loading={false}>
              Add mentor (developing)
            </LoadingButton>
          </Box>
        )}
      </Stack>
    </Card>
  );
}