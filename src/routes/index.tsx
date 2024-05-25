import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Services from '../pages/services';
import Profile from '../pages/profile';
import Dashboard from '../layouts/Dashboard';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute privateElement={<Dashboard />} />,
    children: [
      { path: '', element: <Navigate to="services" replace /> },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
