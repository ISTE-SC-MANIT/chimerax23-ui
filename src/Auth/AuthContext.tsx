import { useRouter } from 'next/router';
import nookies from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import firebaseSDK from '../firebase';
import * as React from 'react';
const AuthContext = createContext<{ user: firebase.default.User | null }>({
  user: null,
});

const REFRESH_INTERVAL = 45 * 60 * 1000; //45 mins
interface authProps {
  children: React.ReactNode;
}

export const AuthProvider = (props: authProps) => {
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const router = useRouter();

  useEffect(() => {
    return firebaseSDK.auth().onIdTokenChanged(async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        return nookies.set(undefined, 'token', token, { path: '/' });
      } else {
        setUser(null);
        return nookies.set(undefined, 'token', '', { path: '/' });
      }
    });
  }, [router]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = firebaseSDK.auth().currentUser;
      // Firebase limit is 60 min. Force Refresh token to regenerate after 45 mins
      if (user) {
        const newToken = await user.getIdToken(true);
        // console.log(newToken);
        return nookies.set(undefined, 'token', newToken, { path: '/' });
      }
    }, REFRESH_INTERVAL);
    //clear setInterval
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
