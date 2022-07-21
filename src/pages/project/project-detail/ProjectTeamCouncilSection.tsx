import { Icon } from '@iconify/react';
// material
import { Box, Card, CardHeader, Divider, Stack, Tooltip, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import _ from 'lodash';
import React, { useState } from 'react';
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

interface IProjectTeamCouncilSectionProps {
  isLoading: boolean;
  currentTeamCouncil: any;
}

// ----------------------------------------------------------------------
export default function ProjectTeamCouncilSection({
  isLoading,
  currentTeamCouncil
}: IProjectTeamCouncilSectionProps) {
  const { studentTeam } = useSelector((state: RootState) => state.student);
  const [isOpenApplicationDetails, setIsOpenApplicationDetails] = useState(false);
  console.log(currentTeamCouncil);
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CardHeader title="Team Councils" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Divider />

        {currentTeamCouncil.length !== 0 ? (
          _.map(currentTeamCouncil, (council) => {
            const { lecturers, evaluationSession } = council;
            return (
              <Card sx={{ p: 2 }}>
                <Stack direction="row">
                  <Box sx={{ display: 'block', width: '100%' }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body1">
                        <b>Council Lecturers:</b>
                      </Typography>
                      {_.map(lecturers, (lecturer) => {
                        const { id, fullName, department } = lecturer;
                        return (
                          <Typography key={id} variant="subtitle2">
                            <b>- {fullName}</b> ({department.name})
                          </Typography>
                        );
                      })}
                    </Box>

                    <Divider />
                    <Typography sx={{ my: 1 }} variant="body1">
                      <b>Current Round: </b> {evaluationSession.round}
                    </Typography>
                    <Divider />
                    <Typography sx={{ mt: 1 }} variant="body1">
                      <b>Grading Criterias: </b>
                    </Typography>
                    {_.map(evaluationSession.semesterCriterias, (criteria) => {
                      const { id, name, evaluation, code } = criteria;
                      return (
                        <Tooltip
                          title={
                            <React.Fragment>
                              Question of criteria:
                              {evaluation}
                            </React.Fragment>
                          }
                          placement="top"
                        >
                          <Typography key={id} variant="subtitle2">
                            - {name} ({code})
                          </Typography>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </Stack>
              </Card>
            );
          })
        ) : (
          <Box>
            <Typography variant="body1" textAlign={'center'}>
              <b>NO COUNCIL YET</b>
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
              Your team still not have any council yet!
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
