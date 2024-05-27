import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
