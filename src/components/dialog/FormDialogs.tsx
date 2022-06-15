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
import { callAPIForCreateNewTeam } from '_apis_/team';

// ----------------------------------------------------------------------

interface FormDialogsProps {
  buttonContent: string;
  title: string;
  content?: string;
  id?: string;
}

export default function FormDialogs({ buttonContent, title, content, id }: FormDialogsProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (id === 'createTeam') {
      const status = await callAPIForCreateNewTeam(text);
      if (status === 200) {
        enqueueSnackbar('Create successfully!');
      } else {
        enqueueSnackbar('Error! Please try again');
      }
    }
    setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
            label="Team's code"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            {id === 'joinTeam' ? 'Join' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
