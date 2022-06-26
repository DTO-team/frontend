import eyeFill from '@iconify/icons-eva/eye-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import paperPlaneFill from '@iconify/icons-eva/paper-plane-fill';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
// routes

// ----------------------------------------------------------------------

interface ITopicMoreMenuProps {
  onRegisterThisTopic: () => void;
  onViewTopicDetail: () => void;
}

export default function TopicMoreMenu(props: ITopicMoreMenuProps) {
  const { onRegisterThisTopic, onViewTopicDetail } = props;
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
        <MenuItem onClick={onRegisterThisTopic} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={paperPlaneFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Register Topic" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onViewTopicDetail} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
