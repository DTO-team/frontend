import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

// ----------------------------------------------------------------------

interface IAlertDialogProps {
  title: string;
  description?: React.ReactNode;
  onAgree: () => void;
  onCancle: () => void;
}

export default function ConfirmDialog(props: IAlertDialogProps) {
  const { onAgree, onCancle, title, description } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="error" variant="outlined" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>No</Button>
          <Button onClick={onAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
