import closeFill from '@iconify/icons-eva/close-fill';
import Icon from '@iconify/react';
import { Button, Divider, FormControl, Modal, styled, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { QuillEditor } from 'components/editor';
import Scrollbar from 'components/Scrollbar';
import _ from 'lodash';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createTeamReport } from 'redux/slices/team';
import { RootState } from 'redux/store';
import { setCollection } from 'firebase/methods/setCollection';
import { setStorage } from 'firebase/methods/setStorage';
import { ReportActionType } from 'utils/enum-utils';
import useAuth from 'hooks/useAuth';
import { TeamManager } from '../../@types/team';
import Upload from './Upload';

const style = {
  position: 'absolute' as 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  minWidth: '60%',
  maxWidth: '80%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 30,
  height: 30,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(1)
}));

interface IWeeklyReportModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  currentStudentTeam: TeamManager;
}

interface IReportPayload {
  projectId: string | undefined;
  isTeamReport: boolean;
  completedTasks: string;
  inProgressTasks: string;
  nextWeekTasks: string;
  urgentIssues: string;
  selfAssessment: string;
  reportEvidences?: IEvidences[];
}

interface IEvidences {
  name: string;
  url: string;
}

const reportPayloadInit = {
  projectId: '',
  isTeamReport: false,
  completedTasks: '',
  inProgressTasks: '',
  nextWeekTasks: '',
  urgentIssues: '',
  selfAssessment: ''
};

export default function WeeklyReportModalContent(props: IWeeklyReportModalContentProps) {
  const { isOpen, onClose, currentStudentTeam } = props;
  const [reportPayload, setReportPayload] = useState<IReportPayload>(reportPayloadInit);
  const [evidences, setEvidences] = useState([]);
  const { student } = useSelector((state: RootState) => state);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { addDocWithID } = setCollection();
  const { uploadEvidences } = setStorage();

  console.log(evidences);

  useEffect(() => {
    setReportPayload(reportPayloadInit);
  }, [isOpen]);

  const handleUploadFilesToCloud = async (evidences: any) => {
    const data = [];
    for (let evidence of evidences) {
      let url = await uploadEvidences(reportPayload.projectId || 'global', evidence);
      data.push({
        name: evidence.name,
        url: url
      });
    }
    return data;
  };

  const _handleOnchangeReportPayload = (value: string, reportAction: ReportActionType) => {
    const newPayload = _.cloneDeep(reportPayload);
    switch (reportAction) {
      case ReportActionType.TASK_COMPLETED: {
        newPayload.completedTasks = value;
        break;
      }
      case ReportActionType.TASK_INPROGRESS: {
        newPayload.inProgressTasks = value;
        break;
      }
      case ReportActionType.NEXT_WEEK_TASK: {
        newPayload.nextWeekTasks = value;
        break;
      }
      case ReportActionType.URGENT_ISSUE: {
        newPayload.urgentIssues = value;
        break;
      }
      case ReportActionType.SELF_ASSESSMENT: {
        newPayload.selfAssessment = value;
        break;
      }
    }
    setReportPayload(newPayload);
  };

  const _handleCreateReport = async () => {
    let newReportPayload = reportPayload;
    newReportPayload.projectId = student.studentTeam.projectId;
    newReportPayload.isTeamReport = true;
    newReportPayload.reportEvidences = await handleUploadFilesToCloud(evidences);
    try {
      const response = await createTeamReport({
        ...newReportPayload,
        teamId: student.studentTeam.teamId
      });
      if (response !== undefined) {
        enqueueSnackbar('Create report successfully', { variant: 'success' });
        for (const mentor of currentStudentTeam.mentors) {
          await addDocWithID(
            'reports',
            'mentors',
            {
              id: user?.id,
              displayName: user?.displayName,
              avatarUrl: user?.avatarUrl,
              currentSemesterId: user?.currentSemesterId,
              email: user?.email,
              role: user?.role
            },
            mentor.id
          );
        }
        onClose();
      } else {
        enqueueSnackbar('Oops! Something went wrong, please try again later', {
          variant: 'error'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFiles = (files: any): void => {
    setEvidences(files);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ invisible: true }}
      sx={{
        backdropFilter: 'blur(1px)',
        overflowY: 'auto'
      }}
    >
      <Box sx={{ ...style, overflow: 'auto' }}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Send new report
          </Typography>
          <Box sx={{ position: 'absolute', right: 0, cursor: 'pointer' }} onClick={onClose}>
            <IconStyle icon={closeFill} />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: 3, display: 'flex', justifyItems: 'center' }}>
          <Scrollbar>
            <FormControl>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Task completed
                </Typography>
                <QuillEditor
                  id="taskcompleted"
                  sx={{ width: 'full' }}
                  value={reportPayload.completedTasks}
                  onChange={(value) => {
                    _handleOnchangeReportPayload(value, ReportActionType.TASK_COMPLETED);
                  }}
                />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Tasks in-progress
                </Typography>
                <QuillEditor
                  id="inprogresstask"
                  sx={{ width: 'full' }}
                  value={reportPayload.inProgressTasks}
                  onChange={(value) => {
                    _handleOnchangeReportPayload(value, ReportActionType.TASK_INPROGRESS);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Tasks to begin next week
                </Typography>
                <QuillEditor
                  id="nextweektask"
                  sx={{ width: 'full' }}
                  value={reportPayload.nextWeekTasks}
                  onChange={(value) => {
                    _handleOnchangeReportPayload(value, ReportActionType.NEXT_WEEK_TASK);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Urgent issues
                </Typography>
                <QuillEditor
                  id="urgentissues"
                  sx={{ width: 'full' }}
                  value={reportPayload.urgentIssues}
                  onChange={(value) => {
                    _handleOnchangeReportPayload(value, ReportActionType.URGENT_ISSUE);
                  }}
                />
              </Box>

              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Self-assessments
                </Typography>
                <QuillEditor
                  id="selfassessments"
                  sx={{ width: 'full' }}
                  value={reportPayload.selfAssessment}
                  onChange={(value) => {
                    _handleOnchangeReportPayload(value, ReportActionType.SELF_ASSESSMENT);
                  }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ mb: 0.5 }}>
                  Evidences
                </Typography>
                <Upload onChangeFiles={onChangeFiles} />
              </Box>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
                Discard
              </Button>
              <Button variant="contained" onClick={_handleCreateReport}>
                Send Report
              </Button>
            </Box>
          </Scrollbar>
        </Box>
      </Box>
    </Modal>
  );
}
