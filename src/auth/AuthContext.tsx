import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType } from 'utils/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState<
    AuthContextType['phoneNumber']
  >(localStorage.getItem('phoneNumber'));

  // keep phoneNumber in localStorage synchronous with AuthContext
  useEffect(() => {
    if (phoneNumber) {
      localStorage.setItem('phoneNumber', phoneNumber);
    } else {
      localStorage.removeItem('phoneNumber');
    }
  }, [phoneNumber]);

  return (
    <AuthContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
