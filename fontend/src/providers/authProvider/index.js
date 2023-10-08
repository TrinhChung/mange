import { createContext, useEffect, useState } from 'react';
import { loginMe } from '../../services/Auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const handlerLogin = async () => {
    const res = await loginMe();
    if (res.success === 1 && res.data) {
      setAuthUser(res.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userLocal = JSON.parse(localStorage.getItem('authUser'));

    if (userLocal) {
      setAuthUser(userLocal);
    }

    if (!userLocal && token) {
      handlerLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
