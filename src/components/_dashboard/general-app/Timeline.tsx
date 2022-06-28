import { RootState, useDispatch, useSelector } from 'redux/store';
import { useEffect, useState } from 'react';
import { last, slice } from 'lodash';
// material
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { styled } from '@material-ui/core/styles';
import { Box, Grid, Paper, Container, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent
} from '@material-ui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import Block from '../../Block';
import { getSemesterList } from 'redux/slices/management';
import { currentSemester } from 'utils/currentSemester';
// ----------------------------------------------------------------------

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
  icon: JSX.Element;
};

const TIMELINES: TimelineType[] = [
  {
    key: 1,
    title: 'Start',
    des: 'Start in-capstone phase',
    time: '05.10.2022',
    color: 'info',
    icon: <LaptopMacIcon />
  },
  {
    key: 2,
    title: 'In-progress',
    des: 'In-progress capstone phase',
    time: '05.26.2022',
    color: 'primary',
    icon: <LaptopMacIcon />
  },
  {
    key: 3,
    title: 'Finished',
    des: 'Finished capstone',
    time: '08.21.2022',
    color: 'secondary',
    icon: <LaptopMacIcon />
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function TimelineComponent() {
  const { semesters } = useSelector((state: RootState) => state.management);
  //
  const lastItem = last(TIMELINES)?.key;
  const reduceTimeLine = slice(TIMELINES, TIMELINES.length - 3);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    async function getData() {
      await getSemesterList();
    }
    getData();
  }, [dispatch]);
  //
  return (
    <RootStyle>
      <Box
        sx={{
          py: 3,
          px: 3,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          borderRadius: '16px'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Block title="Flow Timeline" sx={{ fontSize: '1.25rem' }}>
                <Timeline position="alternate">
                  {TIMELINES.map((item) => (
                    <TimelineItem
                      key={item.key}
                      sx={{ opacity: currentSemester(semesters)?.status === item.key ? 1 : 0.5 }}
                    >
                      <TimelineOppositeContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.time}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          color={
                            currentSemester(semesters)?.status === item.key ? item.color : 'grey'
                          }
                        >
                          {item.icon}
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper
                          sx={{
                            p: 3,
                            bgcolor: 'grey.50012'
                          }}
                        >
                          <Typography variant="subtitle2">{item.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.des}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Block>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  );
}
