import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useRouter } from 'next/dist/client/router';
import CustomDrawer from '../../components/navbar/customDrawer';
import Navbar from '../../components/navbar/Navbar';
import { ComponentProps } from '../../pages/_app';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LoadingScreen from '../loadingScreen';
import { GetTeamDetails } from '../../lib/queries/GetTeamDetailsQuery';
import { GetTeamDetailsQuery } from '../../__generated__/GetTeamDetailsQuery';
import { useQuery } from '@apollo/client';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '90vh',
    backgroundColor: theme.palette.mode === 'light' ? '#ececec' : 'dark',
  },

  typo: {
    fontWeight: 700,
    padding: '20px',
    margin: '20px',
  },
  icons: {
    padding: '2rem',
  },
  iconBox: {
    padding: '4rem',
  },
}));

const Success: React.FC<ComponentProps> = ({
  viewer,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const teamDetailResponse = useQuery<GetTeamDetailsQuery>(GetTeamDetails, {
    fetchPolicy: 'network-only',
  });

  if (teamDetailResponse.loading) {
    return <LoadingScreen loading={true} />;
  }
  return (
    <div>
      <CustomDrawer
        name={viewer.name}
        username={viewer.email}
        open={open}
        setOpen={setOpen}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        teamDetailResponse={teamDetailResponse}
      />
      <Navbar
        setOpen={setOpen}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <Grid
        container
        justifyContent='center'
        onClick={() => setOpen(false)}
        className={classes.root}
      >
        <Box textAlign='center' margin={3}>
          <Typography variant='h5' className={classes.typo}>
            <h1>Thank You</h1>
            Congratulations. Your quiz was successfully submitted. We will get
            back to you soon.
          </Typography>

          <Box className={classes.iconBox}>
            <h3>Connect With Us</h3>
            <br />
            <Link
              className={classes.icons}
              href='https://www.facebook.com/ISTESCMANIT'
            >
              <FacebookIcon style={{ fontSize: 50, color: '	#4267B2' }} />
            </Link>
            <Link
              className={classes.icons}
              href='https://www.instagram.com/istemanit'
            >
              <InstagramIcon style={{ fontSize: 50, color: '#fb3958' }} />
            </Link>
            <Link
              className={classes.icons}
              href='https://mobile.twitter.com/iste_manit'
            >
              <TwitterIcon style={{ fontSize: 50, color: '	#1DA1F2' }} />
            </Link>
            <Link
              className={classes.icons}
              href='https://www.linkedin.com/company/iste-sc-manit'
            >
              <LinkedInIcon style={{ fontSize: 50, color: '#0077b5' }} />
            </Link>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default Success;
