import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import { Icon } from '@iconify/react';
import { Box, Card, Container, Tab, Tabs } from '@material-ui/core';
// material
import { styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// components
import Page from '../../components/Page';
import {
  Profile,
  ProfileCover,
  ProfileFollowers,
  ProfileFriends,
  ProfileGallery
} from '../../components/_dashboard/user/profile';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import { getProfile, onToggleFollow } from '../../redux/slices/user';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends, gallery } = useSelector(
    (state: RootState) => state.user
  );

  const [currentTab, setCurrentTab] = useState('profile');
  const [findFriends, setFindFriends] = useState('');

  useEffect(() => {
    dispatch(getProfile(user?.id));
    /* dispatch(getPosts());
    dispatch(getFollowers());
    dispatch(getFriends());
    dispatch(getGallery()); */
  }, [dispatch, user]);

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId: string) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: 'followers',
      icon: <Icon icon={heartFill} width={20} height={20} />,
      component: <ProfileFollowers followers={followers} onToggleFollow={handleToggleFollow} />
    },
    {
      value: 'friends',
      icon: <Icon icon={peopleFill} width={20} height={20} />,
      component: (
        <ProfileFriends
          friends={friends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      )
    },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <ProfileGallery gallery={gallery} />
    }
  ];

  return (
    <Page title="User: Profile | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' }
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover myProfile={myProfile} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
