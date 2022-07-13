import { Icon } from '@iconify/react';
// material
import linkOutline from '@iconify/icons-eva/link-outline';
import { Box, Button, Card, CardHeader, Divider, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import palette from 'theme/palette';
import { TeamManager } from '../../../@types/team';

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
  currentTeamTopic: any;
  currentStudentTeam: TeamManager;
}

// ----------------------------------------------------------------------
export default function MatchedTopicSection({
  isLoading,
  currentTeamTopic,
  currentStudentTeam
}: IMatchedTopicSectionProps) {
  const { studentTeam } = useSelector((state: RootState) => state.student);
  const [isOpenApplicationDetails, setIsOpenApplicationDetails] = useState(false);
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CardHeader title="Matched Topic" />
        <Button
          variant="outlined"
          color={'info'}
          startIcon={<Icon icon={linkOutline} />}
          sx={{ position: 'absolute', right: 20, top: 20 }}
          disabled={!currentTeamTopic && !studentTeam.isApplicationApproved}
          component={Link}
          to={`${PATH_DASHBOARD.fptuCapstone.topics}/${paramCase(
            currentTeamTopic ? currentTeamTopic.topicId : ''
          )}`}
        >
          View details
        </Button>
      </Box>

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
                  [{currentStudentTeam ? currentStudentTeam.leader.semester : ''}]{' '}
                  {currentTeamTopic ? currentTeamTopic.topicName : ''}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Typography variant="body2" color={palette.light.grey[500]}>
                {currentTeamTopic ? currentTeamTopic.topicName : ''}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" textAlign={'center'}>
              <b>NO TOPIC MATCHED</b>
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
              Your team haven't register any topic yet or topic is on pending approval
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
