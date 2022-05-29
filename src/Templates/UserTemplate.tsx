import { Outlet, Link } from 'react-router-dom';

const UserLayout: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Welcome</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
};

const UserTemplate: React.FC = () => {
  return <UserLayout />;
};

export default UserTemplate;
