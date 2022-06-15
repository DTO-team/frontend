import { Modal, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

interface IActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  maxWidth: '75%',
  overflow: 'auto',
  width: 'fit-content',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

export default function ActionModal(props: IActionModalProps) {
  const { children, isOpen, onClose, title } = props;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ invisible: true }}
      sx={{
        backdropFilter: 'blur(1px)'
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box sx={{ mt: 3, mb: 6 }}>{children}</Box>
      </Box>
    </Modal>
  );
}
