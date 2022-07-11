import Icon from '@iconify/react';
import { Modal, styled, Typography } from '@material-ui/core';
import { Box, SxProps } from '@material-ui/system';
import closeFill from '@iconify/icons-eva/close-fill';
import { Theme } from '@material-ui/core';

interface IActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  style?: SxProps<Theme>;
  isChildModal?: boolean;
}

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  maxWidth: '100%',
  overflow: 'auto',
  width: 'fit-content',
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

export default function ActionModal(props: IActionModalProps) {
  const { children, isOpen, onClose, title, style, isChildModal = false } = props;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby={isChildModal ? 'child-modal-title' : 'parent-modal-title'}
      aria-describedby={isChildModal ? 'child-modal-description' : 'parent-modal-description'}
      BackdropProps={{ invisible: true }}
      sx={{
        backdropFilter: 'blur(1px)',
        ...style
      }}
    >
      <Box sx={boxStyle}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
          <Typography
            id={isChildModal ? 'child-modal-title' : 'parent-modal-title'}
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>
          <Box sx={{ position: 'absolute', right: 0, cursor: 'pointer' }} onClick={onClose}>
            <IconStyle icon={closeFill} />
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>{children}</Box>
      </Box>
    </Modal>
  );
}
