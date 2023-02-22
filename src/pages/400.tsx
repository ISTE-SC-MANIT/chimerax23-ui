import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography } from '@mui/material';
import { Box, useMediaQuery } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import Image from 'next/image';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { logout } from '../Auth/logout';
const theme = createTheme();
theme.typography.h5 = {

  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#ececec',
      height: '100vh',
      padding: '5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
export default function ErrorPage400() {
  const router = useRouter();
  const theme = useTheme();

  React.useEffect(() => {
    logout().then(()=>router.push('/login'));
  },[]);

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>

          <Typography variant='h5' align='center'>
            Oops!! Something Went Wrong.<br /><br />
            Please Click here for login Again.<br /><br />
            <Button
              variant="contained"
              onClick={() => {
                router.push('/login');
              }}
            >
              Login Page
            </Button>
          </Typography>
        </ThemeProvider>

      </div>
    </>
  );
}
