import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({
  privateElement,
}: {
  privateElement: React.ReactNode;
}) => {
  const { phoneNumber } = useAuth();

  if (!phoneNumber) {
    return <Navigate to="/" />;
  }

  return <>{privateElement}</>;
};

export default PrivateRoute;
