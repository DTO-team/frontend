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
  isOpen: boolean;
  onAgree: () => void;
  onCancle: () => void;
}

export default function AlertDialog(props: IAlertDialogProps) {
  const { isOpen, onAgree, onCancle, title, description } = props;

  return (
    <Dialog open={isOpen} onClose={onCancle}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancle}>Disagree</Button>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
