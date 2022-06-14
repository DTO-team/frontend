import useAuth from 'hooks/useAuth';
import PageUnauthorized from 'pages/PageUnauthorized';
import React from 'react';
import { AuthorizeRole } from 'utils/enum-utils';
import SettingList from './settings-list/SettingList';

export default function AdminManagementSettingsPage() {
  const { user } = useAuth();
  return <>{user?.role !== AuthorizeRole.ADMIN ? <PageUnauthorized /> : <SettingList />}</>;
}
