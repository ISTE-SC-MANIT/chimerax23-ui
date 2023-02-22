import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withStyles, makeStyles, createStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Fade, Link, Grid, useMediaQuery, CssBaseline } from '@mui/material';
import Image from 'next/image';
import NavbarHeader from '../components/navbar/navbarheader';
import ThemeToggleButton from '../components/theme/modeToggle';
import { useRouter } from 'next/router';
import Footer from '../components/footer/contact';
import { About } from '../components/about';
// import Sponsors from '../components/sponsors';
import Prize from '../components/prize';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      flexGrow: 1,
      backgroundImage: theme.palette.mode === 'light' ? `url('/landingwhite.png')` : `url('/landingdark.png')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      minHeight: '10vh',
      // flexWrap: 'wrap',
      display: 'flex',
      width: '90%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightNav: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      }
    },
    logo: {
      // marginRight: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '180px',
      },
    },

    menuBtn: {
      backgroundColor: 'white',
      color: '#7638FF',
      marginRight: theme.spacing(1),
      '&:hover': {
        backgroundColor: 'white',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    darkTheme: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    body: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: theme.spacing(-3),
      [theme.breakpoints.down('md')]: {
        margin: 'auto',
        flexDirection: 'column-reverse',
        backgroundImage: theme.palette.mode === 'light' ? `url('/landingwhitemobile.png')` : `url('/landingdarkmobile.png')`
      },
    },
    Link: {
      color: 'white',
      marginTop: '10px',
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5),
      },
    },
    typo: {
      color: 'white',
      textDecoration: 'none',
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3),
        color: 'white'
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        color: 'white'
      },
    },
    prize: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    prizeSection: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(6),
      },
    },
    margin: {
      margin: '50px',
      color: 'white',
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
      },
    },
    mobileDrawer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    flexColumn: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

const Btn = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText('#3997F5'),
    backgroundColor: 'white',
    border: '2px solid white',
    borderRadius: '25px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#7638FF',
      color: 'white'
    },
  },
}))(Button);

const VectorImg = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (mobile) {
    return (
      <Box>
        <Image
          src={'/vectorlanding.png'}
          alt='logo'
          width={window.innerWidth / 1.2}
          height={window.innerWidth / 1.74}
        />
      </Box>
    );
  }
  return (
    <Box>
      <Image
        src={'/vectorlanding.png'}
        alt='logo' width={650} height={430} />
    </Box>
  );
};

const Landing: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <>

      <NavbarHeader open={open} setOpen={setOpen} />
      <div className={classes.root} onClick={() => setOpen(false)}>
        <Box padding={2} className={classes.header}>
          <Box className={classes.logo}>
            <Image
              src={theme.palette.mode === 'light' ? '/chimera-x logo black.png' : '/chimera-x white.png'}
              width='300px'
              height='125px'
              alt='logo'
              onClick={() => router.push('/')}
            />
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center' className={classes.rightNav}>
            <Fade in={true}>
              <Box className={classes.darkTheme}>
                <ThemeToggleButton />
              </Box>
            </Fade>
            <Button
              variant='contained'
              onClick={() => router.push('/login')}
              className={classes.menuBtn}
            >
              Login
            </Button>
            <Button
              variant='contained'
              onClick={() => router.push('/signup')}
              className={classes.menuBtn}
            >
              Sign up
            </Button>
          </Box>
          <Box className={classes.mobileDrawer}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={(event) => {
                event.stopPropagation();
                handleDrawerOpen();
              }}
            >
              <MenuIcon fontSize='large' color='primary' />
            </IconButton>
          </Box>
        </Box>
        <Grid container className={classes.body}>
          <VectorImg />
          <Grid
            container
            item
            xs={12}
            md={4}
            justifyContent='space-around'
            alignItems='center'
            direction='column'
            className={classes.prizeSection}
          >
            <Box className={classes.margin}>
              <Typography variant='h4' align='center' className={classes.typo}>
                <b>Central India&apos;s largest Quizzing Contest</b>
              </Typography>
            </Box>
            <Box className={classes.margin}>
              <Box marginBottom={5}>
                <Typography variant='h5' align='center'>
                  Prelims
                  <br />
                  30th Jan&apos; 2022
                </Typography>
              </Box>
              <Box className={classes.flexColumn} lineHeight={2}>
                <Btn sx={{ color: '#7638FF' }} onClick={() => router.push('/signup')}>Register Now</Btn>
                <Link
                  className={classes.Link}
                  target='_blank'
                  href='https://drive.google.com/file/d/18fYq_uSXg76WQ4Ov6BTZ4rjJFkwTXThV/view?usp=sharing'
                >
                  How to get registered?
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Prize />
      {/* <Sponsors /> */}
    </>
  );
};

export default Landing;
