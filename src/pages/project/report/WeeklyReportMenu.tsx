import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import messageSquareOutline from '@iconify/icons-eva/message-square-outline';
import navigation2Outline from '@iconify/icons-eva/navigation-2-outline';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { AuthorizeRole } from 'utils/enum-utils';
// routes

// ----------------------------------------------------------------------

interface IWeeklyReportMenuProps {
  onViewFeedbacks: () => void;
  onGiveFeedBack: () => void;
}

export default function WeeklyReportMenu(props: IWeeklyReportMenuProps) {
  const { user } = useAuth();
  const { onViewFeedbacks, onGiveFeedBack } = props;
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
        <MenuItem onClick={onViewFeedbacks} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={messageSquareOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Feedbacks" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {user?.role === AuthorizeRole.LECTURER && (
          <MenuItem onClick={onGiveFeedBack} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={navigation2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Add Feedback" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
