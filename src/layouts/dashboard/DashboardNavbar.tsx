import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

// material
import { AppBar, Box, IconButton, Stack, Toolbar } from '@material-ui/core';
import { alpha, styled } from '@material-ui/core/styles';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import { MHidden } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar from './Searchbar';
import ReadFilePopOver from './ReadFilePopOver';
import { AuthorizeRole } from '../../utils/enum-utils';
// hooks
import useAuth from '../../hooks/useAuth';
import SwitchSemesterPopOver from './dashboardServices/SwitchSemesterPopOver';
import { projectFirestore } from 'firebase/config';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { user } = useAuth();
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    let subscriber: any;
    if (Boolean(user)) {
      subscriber = projectFirestore
        .collection('reports')
        .doc(user?.id)
        .collection(user?.role === AuthorizeRole.LECTURER ? 'mentors' : 'students')
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
          let messagesRealtime: any = [];
          let seen = 0;
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              let id = doc.id;
              let data: any = { ...doc.data(), id };
              if (!data?.seen) seen += 1;
              messagesRealtime.push(data);
            }
          });
          if (messagesRealtime.length > 0) {
            setNotis(messagesRealtime);
          }
        });
    }

    // Stop listening for updates when no longer required
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <SwitchSemesterPopOver />
          {user && user.role === AuthorizeRole.ADMIN && <ReadFilePopOver />}
          <NotificationsPopover msgs={notis} />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
