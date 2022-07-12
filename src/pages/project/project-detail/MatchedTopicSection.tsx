import { Icon } from '@iconify/react';
// material
import { Box, Card, CardHeader, Divider, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import palette from 'theme/palette';
// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}));

interface IMatchedTopicSectionProps {
  isLoading: boolean;
  project: any;
}

// ----------------------------------------------------------------------
export default function MatchedTopicSection({ isLoading, project }: IMatchedTopicSectionProps) {
  const { studentTeam } = useSelector((state: RootState) => state.student);

  return (
    <Card>
      <CardHeader title="Matched Topic" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Divider />

        {studentTeam.isApplicationApproved ? (
          <Box>
            <Stack direction="row">
              <Box sx={{ display: 'block' }}>
                <Typography variant="body1" color={palette.light.grey[500]}>
                  <b>Assigned to</b>
                </Typography>
                <Typography variant="h6">
                   {project && project.topicsResponse.topicName}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="body2" color={palette.light.grey[500]}>
               {project && project.topicsResponse.description}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" textAlign={'center'}>
              <b>NO TOPIC MATCHED</b>
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
              Your team haven't register any topic yet
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
