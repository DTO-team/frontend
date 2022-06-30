import { useState } from 'react';
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
  Select
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
  buttonContent: string;
  title: string;
  content?: string;
  id?: string;
  inputPlaceholder?: string;
}

export default function FormDialogs({
  buttonContent,
  title,
  content,
  id,
  inputPlaceholder
}: FormDialogsProps) {
  const { lecturerList } = useSelector((state: RootState) => state.lecturer);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();

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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={JSON.stringify(lecturerList[0].fullName)}
                  onChange={(event) => handleChangeMentor(event)}
                >
                  {_.map(lecturerList, (lecturer) => {
                    const { id, fullName } = lecturer;

                    return (
                      <MenuItem key={id} value={JSON.stringify(lecturer.fullName)}>
                        {fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained" type="submit">
                {id === 'addMentor' ? 'Add' : 'Remove'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </form>
  );
}
