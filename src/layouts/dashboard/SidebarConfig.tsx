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
          { title: 'company account', path: PATH_DASHBOARD.admin.companyManagement },
          { title: 'student account', path: PATH_DASHBOARD.admin.studentManagement }
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
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }
    ]
  }
];

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'my project',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          // { title: 'list', path: PATH_DASHBOARD.user.list },
          // { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'edit', path: PATH_DASHBOARD.user.editById }
          // { title: 'account', path: PATH_DASHBOARD.user.account }
        ]
      }

      // // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // },

      // // MANAGEMENT : BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
      //   ]
      // }
    ]
  },

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

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Activities',
  //   items: [
  //     { title: 'Team List', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // }
];

export { sidebarConfig, sidebarAdminConfig, sidebarGeneralConfig };
