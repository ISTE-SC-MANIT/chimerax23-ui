import type { AppProps } from 'next/app';
import React from 'react';
import {
  ApolloProvider,
  ApolloQueryResult,
  useLazyQuery,
} from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext, toggleMode } from '../components/theme';
import { Router, useRouter } from 'next/router';
import { client } from '../lib/apollo';
import { viewer, viewer_viewer } from '../__generated__/viewer';
import { User } from '../lib/queries/user';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SEO from '../SEO';
import { AuthProvider } from '../Auth/AuthContext';
import cookie from 'js-cookie';
import LoadingScreen from '../components/loadingScreen';
import ErrorPage400 from './400';
import { getStep } from '../Utils/status';
export interface ComponentProps {
  viewer: viewer_viewer;
  refetch: () => Promise<ApolloQueryResult<viewer>>;

  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const paths = router.route.split('/');
  const first = paths[1];
  /*Snackbar States */
  const [success, setSuccess] = React.useState(false);
  const [errors, setError] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const handleClose = (event?: React.SyntheticEvent) => {
    setSuccess(false);
    setError(false);
  };

  const setSuccessMessage = (msg: string) => {
    setSuccessMsg(msg);
    setSuccess(true);
  };

  const setErrorMessage = (msg: string) => {
    setErrorMsg(msg);
    setError(true);
  };
  /* Page loading animation */
  const [routeChange, setRouteChange] = React.useState<boolean>(false);

  const isProtectedRoute = React.useMemo(() => {
    return first === 'dashboard';
  }, [first]);

  Router.events.on('routeChangeStart', () => {
    setRouteChange(true);
  });
  Router.events.on('routeChangeComplete', () => setRouteChange(false));
  Router.events.on('routeChangeError', () => setRouteChange(false));

  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            background: {
              default: '#0A1929',
              paper: '#0A1929',
            },
          }),
          primary: {
            main: '#7638FF'
          },
        },
        typography: {
          fontFamily: [
            'Nunito',
            'Montserrat',
            'Roboto',
            'sans-serif',
          ].join(','),
        },
      }),
    [mode]
  );

  const [view, viewerQuery] = useLazyQuery<viewer>(User, {
    client: client,
    // onCompleted: () => {
    //   console.log('completed', viewerQuery);
    //   router.push(getStep(viewerQuery.data?.viewer.step));
    // },
    onError: () => {
      router.push('/login');
    },
  });

  React.useEffect(() => {
    const themeMode: string | null = localStorage.getItem('theme');
    if (themeMode) setMode(JSON.parse(themeMode));
    if (first == 'dashboard') {
      view()
        .then(() => {
          // console.log(123, viewerQuery);
        })
        .catch((e) => {
          console.log(321, e.message);
        });
    }
  }, [first]);

  return (
    <>
      <SEO />
      <CssBaseline />
      <AuthProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeContext.Provider
              value={{
                toggleMode: () => toggleMode(setMode),
              }}
            >
              <>
                {routeChange && <LoadingScreen loading={true} />}
                {!isProtectedRoute ? (
                  <Component
                    {...pageProps}
                    refetch={viewerQuery.refetch}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                  />
                ) : viewerQuery.loading ? (
                  <>
                    <LoadingScreen loading={true} />
                  </>
                ) : viewerQuery.data ? (
                  <Component
                    {...pageProps}
                    viewer={viewerQuery.data.viewer}
                    refetch={viewerQuery.refetch}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                  />
                ) : viewerQuery.error ? (
                  <>
                    <ErrorPage400 />
                  </>
                ) : (
                  <>
                    <LoadingScreen loading={true} />
                  </>
                )}

                <Snackbar
                  open={success}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  onClose={() => {
                    handleClose();
                  }}
                  autoHideDuration={3000}
                >
                  <Alert onClose={handleClose} severity='success'>
                    {successMsg}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={errors}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  onClose={() => {
                    handleClose();
                  }}
                  autoHideDuration={3000}
                >
                  <Alert onClose={handleClose} severity='error'>
                    {errorMsg}
                  </Alert>
                </Snackbar>
              </>
            </ThemeContext.Provider>
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
