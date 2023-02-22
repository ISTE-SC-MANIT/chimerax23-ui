import axios from 'axios';
import firebaseSDK from '../firebase';
import nookies from 'nookies';

import { NextRouter } from 'next/router';

export const googleLogin = (
  router: NextRouter,
  setErrorMessage: (message: string) => void,
  setSuccessMessage: (message: string) => void,
  refetch: () => void
) => {
  const provider = new firebaseSDK.auth.GoogleAuthProvider();
  firebaseSDK
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      // console.log('response', response);
      if (response.additionalUserInfo?.isNewUser) {
        axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {
            name: response.user?.displayName,
            uid: response.user?.uid,
            email: response.user?.email,
            strategy: response.user?.providerData[0]?.providerId,
          })
          .then((response) => {
            // console.log(response.data);
            setSuccessMessage('Logged in successfully');
            //refetch();
            router.push('/dashboard');
          })
          .catch((error) => {
            firebaseSDK
              .auth()
              .signOut()
              .then(() => nookies.destroy(undefined, 'token', { path: '/' }))
              .catch((e) => console.log(e.message))
              .finally(() => setErrorMessage(error.message));
          });
      } else {
        setSuccessMessage('Logged in successfully');
        // refetch();
        router.push('/dashboard');
      }
    })
    .catch((e) => {
      setErrorMessage(e.message);
    });
};
