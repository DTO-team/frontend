import { Outlet, Link } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const UserLayout: React.FC = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Welcome</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
      <h1>Footer</h1> */}
      <Dashboard />
    </>
  );
};

const UserTemplate: React.FC = () => {
  return <UserLayout />;
};

export default UserTemplate;
