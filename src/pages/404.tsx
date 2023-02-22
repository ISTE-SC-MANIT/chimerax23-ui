import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import { Box, useMediaQuery } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import Image from 'next/image';
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
export default function ErrorPage404() {
  const ErrorImg404 = () => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    if (mobile) {
      return (
        <Box>
          <Image
            src='/404.png'
            alt='logo'
            width={window.innerWidth}
            height={window.innerWidth / 1.74}
          />
        </Box>
      );
    }
    return (
      <Box>
        <Image src='/404.png' alt='logo' width={380} height={320} />
      </Box>
    );
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <Typography variant='subtitle1' align='center'>
          <ErrorImg404 />
          <br />
          We&apos;re sorry , The page you requested could not be found
          <br />
          if you&apos;re experiencing a critical issue, please &nbsp;
          <Link href='mailto:istescmanit@gmail.com'>email support.</Link>
        </Typography>
      </div>
    </>
  );
}
