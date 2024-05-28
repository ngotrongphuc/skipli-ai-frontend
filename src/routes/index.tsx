import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Services from '../pages/Services';
import Profile from '../pages/Profile';
import Dashboard from '../layouts/Dashboard';
import PrivateRoute from './PrivateRoute';
import StartFromScratch from '../pages/Services/StartFromScratch';
import GetInspired from '../pages/Services/GetInspired';

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
        path: 'services/start-from-scratch',
        element: <StartFromScratch />,
      },
      {
        path: 'services/get-inspired',
        element: <GetInspired />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
