import { Outlet, Link } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const UserLayout: React.FC = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

const UserTemplate: React.FC = () => {
  return <UserLayout />;
};

export default UserTemplate;
