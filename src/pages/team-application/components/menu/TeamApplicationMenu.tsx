import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
// routes

// ----------------------------------------------------------------------

interface ITeamApplicationMenuProps {
  onApprove: () => void;
  onReject: () => void;
}

export default function TeamApplicationMenu(props: ITeamApplicationMenuProps) {
  const { onApprove, onReject } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onApprove} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={checkmarkFill} color="green" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onReject} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={closeFill} color="red" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Reject" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
