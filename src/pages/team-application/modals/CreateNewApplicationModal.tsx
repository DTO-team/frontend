import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import ActionModal from 'components/modal/ActionModal';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentProfile } from 'redux/slices/student';
import { getTeamList } from 'redux/slices/team';
import { createTeamApplication } from 'redux/slices/team-application';
import { getTopicList } from 'redux/slices/topic';
import { RootState } from 'redux/store';
import { AuthorizeRole } from 'utils/enum-utils';
import { TeamManager } from '../../../@types/team';
import { ITopicDetail } from '../../../@types/topic';

interface ICreateNewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const selectedTopicInit: ITopicDetail = {
  topicId: '',
  topicName: '',
  description: ''
};

const selectedTeamInit: TeamManager = {
  teamId: '',
  teamName: '',
  leader: {
    id: '',
    code: '',
    fullName: '',
    email: '',
    role: '',
    semester: '',
    status: '',
    avatarUrl: ''
  },
  totalMember: 0
};

export default function CreateNewApplicationModal(props: ICreateNewApplicationModalProps) {
  const { isOpen, onClose } = props;
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { student, topic, team, application } = useSelector((state: RootState) => state);
  const [selectedTopic, setSelectedTopic] = useState<ITopicDetail>(selectedTopicInit);
  const [selectedTeam, setSelectedTeam] = useState<TeamManager>(selectedTeamInit);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const _handleChangeTeam = (event: any) => {
    setSelectedTeam(JSON.parse(event.target.value));
  };

  const _handleChangeTopic = (event: any) => {
    setSelectedTopic(JSON.parse(event.target.value));
  };

  const _handleCreateTeamApplication = async () => {
    if (!_.isEmpty(selectedTeam.teamId) && !_.isEmpty(selectedTopic.topicId)) {
      await dispatch(createTeamApplication(selectedTeam.teamId, selectedTopic.topicId));
      if (!application.error) _handleCloseModal();
    }
  };

  const _handleCloseModal = () => {
    setSelectedTeam(selectedTeamInit);
    setSelectedTopic(selectedTopicInit);
    setIsDisabled(false);
    onClose();
  };

  const displaySelectedTeam = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="subtitle2" gutterBottom component="div">
          <b style={{ marginRight: 2 }}>Team name: </b> {selectedTeam.teamName}
        </Typography>

        <Typography variant="subtitle2" gutterBottom component="div">
          <b style={{ marginRight: 2 }}>Total members: </b>
          <Typography variant="body2" component="span">
            {selectedTeam.totalMember}
          </Typography>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          <b style={{ marginRight: 2 }}>Current Semester: </b>
          <Typography variant="body2" component="span">
            {selectedTeam.leader.semester}
          </Typography>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <b style={{ marginRight: 2 }}>Team leader: </b>
          <Typography variant="body2" component="div">
            {selectedTeam.leader.fullName}
          </Typography>
        </Typography>
      </Box>
    );
  };

  const displaySelectedTopic = () => {
    return (
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="subtitle2" gutterBottom component="div">
          <b style={{ marginRight: 2 }}>Topic name: </b> {selectedTopic.topicName}
        </Typography>
        <Typography variant="subtitle2" component="div">
          <b style={{ marginRight: 2 }}>Topic description: </b>
          <Typography variant="body2" component="div">
            {selectedTopic.description}
          </Typography>
        </Typography>
        {selectedTopic.lecturersDetails && (
          <Typography variant="subtitle2" component="div">
            <b style={{ marginRight: 2 }}>Mentors: </b>
            <Typography variant="body2" component="div">
              {_.map(selectedTopic.lecturersDetails, (lecturer) => (
                <>
                  {lecturer.fullName}
                  <br />
                </>
              ))}
            </Typography>
          </Typography>
        )}
      </Box>
    );
  };

  useEffect(() => {
    function getData() {
      dispatch(getStudentProfile(user?.id));
      dispatch(getTopicList());
      dispatch(getTeamList());
    }
    getData();
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.role === AuthorizeRole.STUDENT) {
      setIsDisabled(true);
      setSelectedTeam(student.student.teamDetail ? student.student.teamDetail : selectedTeamInit);
    }
  }, [student.student.teamDetail, user?.role, isOpen]);

  return (
    <ActionModal
      title="Create new team application"
      isOpen={isOpen}
      onClose={_handleCloseModal}
      children={
        <>
          {/* {application.error && (
            <Typography color="red">Error! Cannot create application</Typography>
          )} */}
          <div>
            {user?.role !== AuthorizeRole.STUDENT && (
              <FormControl sx={{ my: 1 }} fullWidth size="small">
                <InputLabel id="demo-simple-select-helper-label">Team</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Team"
                  disabled={isDisabled}
                  value={JSON.stringify(selectedTeam)}
                  onChange={(event) => _handleChangeTeam(event)}
                >
                  {_.map(team.teamList, (team) => {
                    const { teamId, teamName } = team;
                    return (
                      <MenuItem key={teamId} value={`${JSON.stringify(team)}`}>
                        {teamName}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Select team for application</FormHelperText>
              </FormControl>
            )}
            {selectedTeam && displaySelectedTeam()}
          </div>

          <div>
            <FormControl sx={{ mb: 1, mt: 3 }} fullWidth size="small">
              <InputLabel id="demo-simple-select-helper-label">Topic</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Topic"
                value={JSON.stringify(selectedTopic)}
                onChange={(event) => _handleChangeTopic(event)}
              >
                {_.map(topic.topicList, (topic) => {
                  const { topicId, topicName } = topic;
                  return (
                    <MenuItem key={topicId} value={`${JSON.stringify(topic)}`}>
                      {topicName}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select topic for application</FormHelperText>
            </FormControl>
            {selectedTopic && displaySelectedTopic()}
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={_handleCloseModal}>
              Discard
            </Button>
            <Button variant="contained" onClick={() => _handleCreateTeamApplication()}>
              Create application
            </Button>
          </Box>
        </>
      }
    />
  );
}
