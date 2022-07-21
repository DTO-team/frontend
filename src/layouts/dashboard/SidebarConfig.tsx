// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban')
};

const sidebarAdminConfig = [
  {
    subheader: 'admin management',
    items: [
      {
        title: 'manage lists',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.kanban,
        children: [
          { title: 'admin settings', path: PATH_DASHBOARD.admin.settingsPage },
          { title: 'lecturer account', path: PATH_DASHBOARD.admin.lecturerManagement },
          { title: 'student account', path: PATH_DASHBOARD.admin.studentManagement },
          { title: 'criteria list', path: PATH_DASHBOARD.admin.criteriaPage }
        ]
      }
    ]
  }
];

const sidebarLecturerConfig = [
  {
    subheader: 'lecturer management',
    items: [
      {
        title: 'manage lists',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.kanban,
        children: [
          { title: 'projects in council', path: PATH_DASHBOARD.admin.projectsInCouncilManagement }
        ]
      }
    ]
  }
];

const sidebarGeneralConfig = [
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      }
    ]
  }
];

const sidebarUserConfig = [
  {
    subheader: 'My Project',
    items: [{ title: 'Project', path: PATH_DASHBOARD.myProject.projectDetail, icon: ICONS.user }]
  }
];

const sidebarConfig = [
  {
    subheader: 'fptu-capstone',
    items: [
      { title: 'team list', path: PATH_DASHBOARD.fptuCapstone.teams, icon: ICONS.kanban },
      { title: 'topic list', path: PATH_DASHBOARD.fptuCapstone.topics, icon: ICONS.chat },
      {
        title: 'Team application',
        path: PATH_DASHBOARD.admin.teamApplications,
        icon: ICONS.analytics
      }
    ]
  }
];

export {
  sidebarConfig,
  sidebarAdminConfig,
  sidebarGeneralConfig,
  sidebarUserConfig,
  sidebarLecturerConfig
};
