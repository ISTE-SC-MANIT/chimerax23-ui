import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { withStyles, makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import FormDialog from '../components/forgotPassword';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { InputAdornment, IconButton, Theme } from '@mui/material';
import { Formik, Form, Field, FieldProps } from 'formik';
import { ComponentProps } from './_app';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import firebaseSDK from '../firebase';
import { Status } from '../Utils/status';
import nookies from 'nookies';
import { googleLogin } from '../Auth/googleLogin';
import { facebookLogin } from '../Auth/facebookLogin';
import { emailPasswordLogin } from '../Auth/emailpasswordLogin';
import { padding } from '@mui/system';

const SigninButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText('#3997F5'),
    backgroundColor: 'white',
    border: '2px solid white',
    borderRadius: '50px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#7638FF',
      color: 'white'
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url('/login1.png')`,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url('/signupmobile.png')`,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
    },
  },
  Backcolor: {
    // backgroundColor:
    //   theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#7638FF',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: '#7638FF',
  },
  logo: {
    width: '80%',
    height: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(5),
  },
  imageTitle: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px `,
    border: '2px solid currentColor',
    borderRadius: '50px',
  },
  field: {
    marginTop: theme.spacing(4),
  },
  imageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  vector: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  imageV: {
    width: '100% !important',
  },
  customButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  base: {
    width: '80%',
    marginTop: theme.spacing(2),
  },
  logoIcon: {
    border: '2px solid black',
    borderRadius: '50px',
  },
  signinBtn: {
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '100px',
    },
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.mode === 'light' ? 'black' : 'white',
  },
}));
const VectorImg = (classes: any) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (mobile) {
    return (
      <Box className={classes.vector}>
        <Image
          src='/login.png'
          alt='logo'
          className={classes.imageV}
          width={window.innerWidth}
          height={window.innerWidth / 1.45}
        />
      </Box>
    );
  }
  return (
    <Box className={classes.vector}>
      <Image
        src='/login.png'
        alt='logo'
        className={classes.imageV}
        width={500}
        height={345}
      />
    </Box>
  );
};

const Login: React.FC<ComponentProps> = ({
  refetch,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const classes = useStyles();
  const [openPass, setOpenPass] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [status, setStatus] = React.useState<Status>(Status.IDLE);
  const [remember, setRemember] = React.useState(true);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleShowPassword = () => {
    setVisible(!visible);
  };
  const initialValues = {
    password: '',
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Provide a valid Email ID')
      .required('Email cannot be empty'),
    password: yup
      .string()
      .min(6, 'Password must be minimum of 6 characters')
      .required('Password cannot be empty'),
  });

  return (
    <>
      {openPass && (
        <FormDialog
          open={openPass}
          onClose={() => setOpenPass(false)}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      <Grid container component='main' className={classes.root}>
        <Grid item xs={false} sm={6} className={classes.image}>
          <Box className={classes.logo}>
            <Image
              className={classes.link}
              src='/ChimeraX-logo-white.svg'
              alt='logo'
              width={400}
              height={104}
              onClick={() => router.push('/')}
            />
          </Box>
          <Box className={classes.signinBtn}>
            <Grid container justifyContent='center' alignItems='center'>
              <SigninButton
                sx={{ color: '#7638FF' }}
                onClick={() => {
                  router.push('/signup');
                }}
              >
                Sign Up
              </SigninButton>
            </Grid>
          </Box>
          <VectorImg classes={classes} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          elevation={0}
          square
          className={classes.Backcolor}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h2'>
              Log In
            </Typography>
            <Formik
              onSubmit={(values) =>
                emailPasswordLogin(
                  values,
                  setStatus,
                  router,
                  setErrorMessage,
                  setSuccessMessage,
                  refetch
                )
              }
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              <Form aria-label='log in form' id='log-in-form'>
                <Field name='email'>
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues['email']>) => (
                    <TextField
                      fullWidth
                      id='email-input'
                      label='Email Address'
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ''}
                      variant='outlined'
                      margin='normal'
                    />
                  )}
                </Field>
                <Field name='password' className={classes.field}>
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues['password']>) => (
                    <TextField
                      fullWidth
                      id='password-input'
                      label='Password'
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ''}
                      variant='outlined'
                      margin='normal'
                      type={visible ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleShowPassword}
                              edge='end'
                            >
                              {visible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                <FormControlLabel
                  control={
                    <Checkbox
                      value='remember'
                      onChange={() => setRemember(!remember)}
                      color='primary'
                    />
                  }
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                  color='primary'
                  disabled={!status}
                >
                  {status === Status.LOADING ? `Submitting...` : `Log In`}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => setOpenPass(true)}
                      variant='body2'
                      className={classes.link}
                    >
                      Forget password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => router.push('/signup')}
                      variant='body2'
                      className={classes.link}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  {' '}
                  <Typography align='center' variant='subtitle1'>
                    Or Log in with other social platforms
                  </Typography>
                </Box>
                <Box>
                  <Grid container justifyContent='center' alignItems='center'>
                    <IconButton
                      onClick={() =>
                        googleLogin(
                          router,
                          setErrorMessage,
                          setSuccessMessage,
                          refetch
                        )
                      }
                    >
                      <Image
                        src='/google-logo.png'
                        alt='google'
                        width={60}
                        height={60}
                        className={classes.logoIcon}
                      />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        facebookLogin(
                          router,
                          setErrorMessage,
                          setSuccessMessage,
                          refetch
                        )
                      }
                    >
                      <Image
                        src='/fb-logo.png'
                        alt='google'
                        width={60}
                        height={60}
                        className={classes.logoIcon}
                      />
                    </IconButton>
                  </Grid>
                </Box>
              </Form>
            </Formik>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
