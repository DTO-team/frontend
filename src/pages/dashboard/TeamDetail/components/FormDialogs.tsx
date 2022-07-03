import { useEffect, useRef, useState } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
  Stack
} from '@material-ui/core';
import _ from 'lodash';
import { useSnackbar } from 'notistack5';
import {
  callAPIForCreateNewTeam,
  callAPIForJoinTeam,
  callAPIForUpdateTeamMentor
} from '_apis_/team';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import useAuth from 'hooks/useAuth';
import { AuthorizeRole } from 'utils/enum-utils';
import { objectsEqual } from 'utils/objectEqual';

// ----------------------------------------------------------------------

interface FormDialogsProps {
  teamDetail?: any;
  buttonContent: string;
  title: string;
  content?: string;
  id?: string;
  inputPlaceholder?: string;
}

export default function FormDialogs({
  teamDetail,
  buttonContent,
  title,
  content,
  id,
  inputPlaceholder
}: FormDialogsProps) {
  const { lecturerList } = useSelector((state: RootState) => state.lecturer);
  const { user } = useAuth();

  const [mentors, setMentors] = useState({
    mentorId: [],
    newLecturerId: [],
    projectId: teamDetail.projectId
  });
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();

  useEffect(() => {
    if (teamDetail && teamDetail.mentors.length > 0) {
      setMentors({
        ...mentors,
        mentorId: teamDetail.mentors.map((mentor: any) => ({
          fullName: mentor.fullName,
          id: mentor.id
        }))
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamDetail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setMentors({
      mentorId: [],
      newLecturerId: [],
      projectId: teamDetail.projectId
    });
    setOpen(false);
  };

  const handleChangeMentor = (data: any) => {
    console.log(data);
    console.log(mentors);
    if (!Boolean(data.length)) {
      setMentors({
        ...mentors,
        mentorId: [],
        newLecturerId: []
      });
    } else {
      const results = data.filter(
        (mentor: any) => !teamDetail.mentors.some((mentorX: any) => mentorX.id === mentor.id)
      );
      setMentors({
        ...mentors,
        mentorId: [],
        newLecturerId: results.map((mentor: any) => mentor.id)
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!Boolean(mentors.mentorId.length) && !Boolean(mentors.newLecturerId.length)) {
      enqueueSnackbar('Each team must have at least one mentor!', { variant: 'info' });
    } else {
      const arraysEqual =
        teamDetail.mentors.length === mentors.mentorId.length &&
        teamDetail.mentors.every((o: any, idx: any) =>
          objectsEqual({ fullName: o.fullName, id: o.id }, mentors.mentorId[idx])
        );
      if (arraysEqual) {
        enqueueSnackbar('Please add or remove!', { variant: 'info' });
        return;
      }
      if (Boolean(mentors.newLecturerId.length)) {
        const { statusCode } = await callAPIForUpdateTeamMentor(mentors, 'add');
        if (statusCode === 200) {
          enqueueSnackbar('Update successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }
      }
      if (teamDetail.mentors.length !== mentors.mentorId.length) {
        const { statusCode } = await callAPIForUpdateTeamMentor(
          {
            ...mentors,
            newLecturerId: []
          },
          'remove'
        );
        if (statusCode === 200) {
          enqueueSnackbar('Update successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }
      }
      window.location.reload();
    }
  };
  return user && user.role === AuthorizeRole.ADMIN && lecturerList && lecturerList.length > 0 ? (
    <>
      <LoadingButton type="submit" variant="contained" loading={false} onClick={handleClickOpen}>
        Update mentor
      </LoadingButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              id="update-mentor"
              options={lecturerList}
              getOptionLabel={(option) => option.fullName}
              defaultValue={teamDetail.mentors.map((lecturer: any) => ({
                fullName: lecturer.fullName,
                id: lecturer.id
              }))}
              onChange={(event: any, value) => handleChangeMentor(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Update mentor" placeholder="Add more mentor" />
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {id === 'update' ? 'Update' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <p>loading</p>
  );
}
