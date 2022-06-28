import eyeFill from '@iconify/icons-eva/eye-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import paperPlaneFill from '@iconify/icons-eva/paper-plane-fill';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from 'routes/paths';
// routes

// ----------------------------------------------------------------------

interface ITopicMoreMenuProps {
  onRegisterThisTopic: () => void;
  topicId: string;
}

export default function TopicMoreMenu(props: ITopicMoreMenuProps) {
  const { onRegisterThisTopic, topicId } = props;
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

        <MenuItem
          sx={{ color: 'text.secondary' }}
          component={RouterLink}
          to={`${PATH_DASHBOARD.fptuCapstone.topics}/${paramCase(topicId)}`}
        >
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
