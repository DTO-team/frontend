import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getUserInfoById, getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';
import useAuth from '../../hooks/useAuth';
import Page500 from 'pages/Page500';
import { AxiosResponse } from 'axios';

interface AxiosResponseChild extends AxiosResponse {
  userName: string;
  fullName: string;
  email: string;
}

export default function UserCreate() {
  const [userInfo, setUserInfo] = useState<AxiosResponseChild | null | void>(null);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    handleGetUserInfo(id);
  }, [id]);

  const handleGetUserInfo = async (id: string) => {
    const data = await getUserInfoById(id);
    if (data !== 500) {
      setUserInfo(data);
    }
  };

  if (!userInfo) return <Page500 />;

  return (
    <Page title={`User: ${userInfo?.fullName} | DTO`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={id === user?.id ? 'Your profile' : `${userInfo['fullName']}'s profile`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: userInfo?.fullName || '' }
          ]}
        />

        <UserNewForm isEdit={id === user?.id} currentUser={userInfo} />
      </Container>
    </Page>
  );
}
