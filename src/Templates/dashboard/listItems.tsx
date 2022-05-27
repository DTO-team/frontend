import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

declare type NavigationType = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavigationType[] = [
  {
    name: 'Home',
    path: '',
    icon: <PeopleIcon />,
  },
  {
    name: 'Reports',
    path: 'report',
    icon: <BarChartIcon />,
  },
];

const StyledListItemText = styled(ListItemText)({
  '& span': {
    fontSize: '14px',
  },
});

export const mainListItems = navItems.map(({ icon, path, name }, index) => {
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? 'nav_active' : 'nav_item')}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <StyledListItemText primary={name} />
      </ListItemButton>
    </NavLink>
  );
});

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
