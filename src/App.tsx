import { routes } from 'routes';
import { useRoutes } from 'react-router-dom';

const App = () => {
  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  let element = useRoutes(routes);
  return <>{element}</>;
};

export default App;
