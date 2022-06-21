import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { callAPIForCreateNewTeam, callAPIForJoinTeam } from '_apis_/team';
import { useNavigate } from 'react-router-dom';

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        {buttonContent}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label={inputPlaceholder}
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" type="submit">
            {id === 'joinTeam' ? 'Join' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
