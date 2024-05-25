import { useContext, useEffect } from 'react';
import AuthContext from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  privateElement,
}: {
  privateElement: React.ReactNode;
}) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{privateElement}</>;
};

export default PrivateRoute;
