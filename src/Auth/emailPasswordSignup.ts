import axios from 'axios';
import { NextRouter } from 'next/router';
import firebaseSDK from '../firebase';
import { getStep, Status } from '../Utils/status';
import nookies from 'nookies';

interface FormValues {
  fullName: string;
  password: string;
  email: string;
}

export const emailPasswordSignUp = (
  values: FormValues,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  formValues: FormValues,
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>,
  router: NextRouter,
  setErrorMessage: (message: string) => void,
  setSuccessMessage: (message: string) => void,
  refetch: () => void
) => {
  setStatus(Status.LOADING);
  firebaseSDK
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(async (response) => {
      await response.user?.updateProfile({
        displayName: values.fullName,
      });
      return response;
    })
    .then((response) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {
          name: response.user?.displayName,
          uid: response.user?.uid,
          email: response.user?.email,
          strategy: response.user?.providerData[0]?.providerId,
        })
        .then((response) => {
          // console.log(response.data);
          setStatus(Status.SUCCESS);
          setSuccessMessage('Successfully created account.');
          // refetch();
          router.push('/dashboard');
        })
        .catch((error) => {
          setStatus(Status.ERROR);
          response.user
            ?.delete()
            .then(() => nookies.destroy(undefined, 'token', { path: '/' }))
            .catch((e) => console.log(e.message))
            .finally(() => {
              setFormValues({ ...formValues });
              setErrorMessage(error.message);
              router.push('/signup');
            });
        });
    })
    .catch((error) => {
      setStatus(Status.ERROR);
      setFormValues({ ...formValues });
      setErrorMessage(error.message);
    });
};
