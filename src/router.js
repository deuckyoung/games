import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home } from './pages';
import { games } from './games';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/home'} replace />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  ...games.map(props => ({
    path: `/${props.path}`,
    element: <props.component {...props} />,
  })),
]);

export default router;
