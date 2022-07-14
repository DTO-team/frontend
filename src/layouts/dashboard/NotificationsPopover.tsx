import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import useAuth from 'hooks/useAuth';
// material
import {
  Box,
  List,
  Badge,
  Avatar,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@material-ui/core';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { setCollection } from 'firebase/methods/setCollection';

type TNotificationPopover = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: string;
  seen: boolean;
  avatarUrl?: string;
  displayName?: string;
  role?: string;
};

function renderContent(notification: TNotificationPopover) {
  const title = (
    <Typography variant="subtitle2">
      {notification.displayName}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; sent their report
      </Typography>
    </Typography>
  );
  return {
    avatar: notification.avatarUrl ? (
      <img alt={notification.title} src={notification.avatarUrl} />
    ) : null,
    title
  };
}

const handleRenderTime = (timeCreatedAt: any) => {
  let date = new Date(timeCreatedAt.seconds * 1000);
  date.toISOString().substring(0, 10);
  let time = formatDistanceToNowStrict(date, {
    locale: vi
  });
  return time;
};

function NotificationItem({ notification }: { notification: TNotificationPopover }) {
  const { title, avatar } = renderContent(notification);
  const { updateSeenMessageField } = setCollection();
  const { user } = useAuth();

  const handleSeen = async (id: string) => {
    if (Boolean(user)) {
      await updateSeenMessageField(
        'reports',
        notification.role === 'STUDENT' ? 'mentors' : 'students',
        user?.id,
        notification.id
      );
    }
  };

  return (
    <ListItemButton
      onClick={() => handleSeen(notification.id)}
      to="#"
      disableGutters
      key={notification.id}
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        '&:not(:last-of-type)': { mb: '1px' },
        ...(!notification.seen && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {handleRenderTime(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

type NotificationsPopoverProps = {
  msgs: any;
};

export default function NotificationsPopover({ msgs }: NotificationsPopoverProps) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [unreadMsgs, setUnreadMsgs] = useState([]);
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    setNotis(msgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  useEffect(() => {
    handleUnreadNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notis]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnreadNumber = () => {
    if (Boolean(notis.length)) {
      setUnreadMsgs(notis.filter((comment: any) => comment.seen === false));
    }
    return [];
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        {unreadMsgs.length > 0 ? (
          <Badge badgeContent={unreadMsgs.length} color="error">
            <Icon icon={bellFill} width={20} height={20} />
          </Badge>
        ) : (
          <Icon icon={bellFill} width={20} height={20} />
        )}
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unreadMsgs.length} unread messages
            </Typography>
          </Box>

          {/* {handleUnreadNumber().length > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {Boolean(unreadMsgs.length) && (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  New
                </ListSubheader>
              }
            >
              {unreadMsgs.map((message: any) => (
                <NotificationItem key={message.id} notification={message} />
              ))}
            </List>
          )}
        </Scrollbar>
        {Boolean(notis.length) && unreadMsgs.length < notis.length && (
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notis.map(
              (message: any) =>
                message.seen && <NotificationItem key={message.id} notification={message} />
            )}
          </List>
        )}
      </MenuPopover>
    </>
  );
}
