import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { withStyles, makeStyles } from '@mui/styles';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { InputAdornment, IconButton } from '@mui/material';
import { Formik, Form, Field, FieldProps } from 'formik';
import { ComponentProps } from './_app';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NextPage } from 'next';
import { getStep, Status } from '../Utils/status';
import firebaseSDK from '../firebase';
import nookies from 'nookies';
import { DisabledByDefault } from '@mui/icons-material';
import LinearLoading from '../components/linearLoading';
import { emailPasswordSignUp } from '../Auth/emailPasswordSignup';
import { googleLogin } from '../Auth/googleLogin';
import { facebookLogin } from '../Auth/facebookLogin';
const LoginButton = withStyles((theme) => ({
	root: {
		// color: theme.palette.getContrastText('#3997F5'),
		backgroundColor: 'white',
		border: '2px solid white',
		borderRadius: '50px',
		padding: '10px 20px',
		'&:hover': {
			backgroundColor: '#7638FF',
			color: 'white',
		},
	},
}))(Button);

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100vh',
	},
	Backcolor: {
		// backgroundColor:
		//   theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
	},
	image: {
		// backgroundImage: `url('/signup1.png')`,
		backgroundRepeat: 'no-repeat',
		// backgroundColor:
		//   theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		[theme.breakpoints.down('md')]: {
			// backgroundColor: `#7638FF`,
			// backgroundImage: `url('signupmobile.png')`
		},
		[theme.breakpoints.down('xs')]: {
			backgroundColor:
				theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
		},
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#0E8388',
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
		width: 'fit-content',
		height: '100px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(5),
	},
	imageTitle: {
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px `,
		border: '2px solid currentColor',
		borderRadius: '20px',
	},
	imageButton: {
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageTitle2: {
		color: theme.palette.common.white,
	},
	vector: {
		width: '100%',
		// marginTop: theme.spacing(4),
	},
	imageV: {
		width: '100% !important',
		// marginLeft: `${theme.spacing(8)} !important`,
		animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut} infinite alternate`,
		height: '600px',
		paddingLeft: '4rem',
	},
	customButton: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	base: {
		width: '100%',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(6),
	},
	logoIcon: {
		border: '2px solid black',
		borderRadius: '50px',
	},
	loginBtn: {
		marginBottom: '10px',
		[theme.breakpoints.up('md')]: {
			marginBottom: '100px',
		},
	},
	label: {
		color: '#0E8388 !important',
	},
	'@keyframes myEffect': {
		'0%': {
			transform: 'translateY(-15px)',
		},
		'100%': {
			transform: 'translateY(0px)',
		},
	},
}));
const VectorImg = () => {
	const classes = useStyles();
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('sm'));
	if (mobile) {
		return (
			<Box className={classes.vector} display='flex' justifyContent={'center'}>
				<Image
					// src='/signin.png'
					src='/NewUI/signup.png'
					alt='logo'
					className={classes.imageV}
					width={window.innerWidth}
					height={window.innerWidth}
				/>
			</Box>
		);
	}
	return (
		<Box className={classes.vector} display='flex' justifyContent={'center'}>
			<Image
				src='/NewUI/signup.png'
				alt='logo'
				className={classes.imageV}
				width={460}
				height={500}
			/>
		</Box>
	);
};
export interface FormValues {
	fullName: string;
	email: string;
	password: string;
}
const SignUp: NextPage<ComponentProps> = ({
	refetch,
	setErrorMessage,
	setSuccessMessage,
}) => {
	const classes = useStyles();
	const router = useRouter();
	const [loading, setloading] = React.useState(false);
	const [status, setStatus] = React.useState<Status>(Status.IDLE);
	const [visible, setVisible] = React.useState(false);
	const theme = useTheme();
	const [formValues, setFormValues] = React.useState<FormValues>({
		fullName: '',
		email: '',
		password: '',
	});
	const initialValues = {
		fullName: '',
		email: '',
		password: '',
	};
	const validationSchema = yup.object({
		fullName: yup.string().required(),
		email: yup
			.string()
			.email('Provide a valid Email ID')
			.required('Email cannot be empty'),
		password: yup
			.string()
			.min(6, 'Password must be minimum of 6 characters')
			.required('Password cannot be empty'),
	});

	const handleShowPassword = () => {
		setVisible(!visible);
	};

	return (
		<Grid container component='main' className={classes.root}>
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
						Sign Up
					</Typography>
					<Formik
						onSubmit={(values) =>
							emailPasswordSignUp(
								values,
								setStatus,
								formValues,
								setFormValues,
								router,
								setErrorMessage,
								setSuccessMessage,
								refetch
							)
						}
						validationSchema={validationSchema}
						initialValues={initialValues}
					>
						<Form aria-label='sign up form' id='sign-up-form'>
							<Field name='fullName'>
								{({
									field,
									meta,
								}: FieldProps<typeof initialValues['fullName']>) => (
									<TextField
										fullWidth
										id='name-input'
										label='Full Name'
										required
										{...field}
										error={!!(meta.touched && meta.error)}
										helperText={meta.touched ? meta.error : ''}
										variant='outlined'
										margin='normal'
										sx={{
											'& .MuiOutlinedInput-root': {
												'&:hover fieldset': {
													borderColor: '#0E8388',
												},
											},
										}}
										InputLabelProps={{ className: `${classes.label}` }}
									/>
								)}
							</Field>
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
										sx={{
											'& .MuiOutlinedInput-root': {
												'&:hover fieldset': {
													borderColor: '#0E8388',
												},
											},
										}}
										InputLabelProps={{ className: `${classes.label}` }}
									/>
								)}
							</Field>
							<Field name='password'>
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
										sx={{
											'& .MuiOutlinedInput-root': {
												'&:hover fieldset': {
													borderColor: '#0E8388',
												},
											},
										}}
										InputLabelProps={{ className: `${classes.label}` }}
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
									<Checkbox value='remember' style={{ color: '#0E8388' }} />
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
								sx={{
									backgroundColor: '#0E8388',
									'&:hover': { background: 'none', color: '#0E8388' },
								}}
							>
								{status === Status.LOADING
									? `Submitting...`
									: `Create new account`}
							</Button>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								className={classes.submit}
								color='primary'
								disabled={!status}
								sx={{
									backgroundColor: 'white',
									color: '#0E8388',
									border: 'none',
									'&:hover': { background: 'none', color: '#0E8388' },
								}}
								onClick={() => router.push('/login')}
							>
								One of Us? Login
							</Button>
							
							<Box mt={5}>
								{' '}
								<Typography align='center' variant='subtitle1'>
									Or Sign up with other social platforms
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
									{/* <IconButton
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
                  </IconButton> */}
								</Grid>
							</Box>
						</Form>
					</Formik>
				</div>
			</Grid>

			<Grid item xs={false} sm={6} className={classes.image}>
				<Box className={classes.logo}>
					<Image
						// className={classes.link}
						src={
							theme.palette.mode === 'light'
								? '/chimera-x logo black.png'
								: '/chimera-x white.png'
						}
						alt='logo'
						width={400}
						height={104}
						onClick={() => router.push('/')}
					/>

				</Box>
				{/* <Box className={classes.loginBtn}> */}
				{/* <Grid container justifyContent='center' alignItems='center'> */}

				{/* </Grid> */}
				{/* </Box> */}
				<Box marginTop={'6rem'}>
					<VectorImg />
				</Box>
			</Grid>
		</Grid>
	);
};

export default SignUp;
