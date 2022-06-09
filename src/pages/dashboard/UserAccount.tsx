import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import { Icon } from '@iconify/react';
// material
import { Box, Container, Tab, Tabs } from '@material-ui/core';
import { capitalCase } from 'change-case';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// components
import Page from '../../components/Page';
import {
  AccountBilling,
  AccountChangePassword,
  AccountGeneral,
  AccountNotifications,
  AccountSocialLinks
} from '../../components/_dashboard/user/account';
// hooks
import useSettings from '../../hooks/useSettings';
import {
  getAddressBook,
  getCards,
  getInvoices,
  getNotifications,
  getProfile
} from '../../redux/slices/user';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { cards, invoices, myProfile, addressBook, notifications } = useSelector(
    (state: RootState) => state.user
  );

  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile(user?.id));
  }, [dispatch, user]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'billing',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling cards={cards} addressBook={addressBook} invoices={invoices} />
    },
    {
      value: 'notifications',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountNotifications notifications={notifications} />
    },
    {
      value: 'social_links',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={myProfile} />
    },
    {
      value: 'change_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
