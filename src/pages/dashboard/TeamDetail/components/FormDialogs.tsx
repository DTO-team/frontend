import { useEffect, useState } from 'react';
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
import { callAPIForCreateNewTeam, callAPIForJoinTeam } from '_apis_/team';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@material-ui/lab';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import useAuth from 'hooks/useAuth';
import { AuthorizeRole } from 'utils/enum-utils';

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
    newLecturerId: []
  });
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();

  useEffect(() => {
    if (teamDetail && teamDetail.mentors.length > 0) {
      setMentors({
        ...mentors,
        mentorId: teamDetail.mentors.map((mentor: any) => mentor.id)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamDetail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleChangeMentor = (e: any) => {
    console.log(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (id === 'createTeam') {
      const { statusCode, data } = await callAPIForCreateNewTeam(text);
      console.log(statusCode, data);
      if (statusCode === 201) {
        enqueueSnackbar('Create successfully!');
        setOpen(false);
        navigate(data.teamId, { replace: true });
      } else if (statusCode === 400) {
        enqueueSnackbar('You already in another class!');
      } else {
        enqueueSnackbar('Something went wrong, try again!');
      }
    }
    if (id === 'joinTeam') {
      const { statusCode, data } = await callAPIForJoinTeam('add', '/student', text);
      if (statusCode === 200) {
        enqueueSnackbar('Create successfully!');
        setOpen(false);
        navigate(data.teamId, { replace: true });
      } else if (statusCode === 400) {
        enqueueSnackbar('You already in another class!');
      } else {
        enqueueSnackbar('Something went wrong, try again!');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {user && user.role === AuthorizeRole.ADMIN && lecturerList && lecturerList.length > 0 && (
        <>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            onClick={handleClickOpen}
          >
            Update mentor (developing)
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
              <Button onClick={handleSubmit} variant="contained" type="submit">
                {id === 'update' ? 'Update' : 'Remove'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </form>
  );
}
