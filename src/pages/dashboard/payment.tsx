import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { useTheme, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  ListItem,
  ListItemIcon,
  Checkbox,
  Link,
  ListItemText,
  Divider,
  List,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import { ComponentProps } from '../_app';
import { loadScript } from '../../Utils/loadScript';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomDrawer from '../../components/navbar/customDrawer';
import Navbar from '../../components/navbar/Navbar';
import { GetTeamDetails } from '../../lib/queries/GetTeamDetailsQuery';
import LoadingScreen from '../../components/loadingScreen';
import { useRouter } from 'next/router';
import ScrollDialog from '../../components/t&c';
import { useMutation, useQuery } from '@apollo/client';
import { GetTeamDetailsQuery } from '../../__generated__/GetTeamDetailsQuery';
import { CreateOrder } from '../../lib/mutations/CreateOrderMutation';
import {
  CreateOrderInput,
  PayOrderInput,
} from '../../__generated__/globalTypes';
import {
  CreateOrderMutation,
  CreateOrderMutation_createOrder,
} from '../../__generated__/CreateOrderMutation';
import { PayOrder } from '../../lib/mutations/PayOrderMutation';
import { PayOrderMutation } from '../../__generated__/PayOrderMutation';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
  },
  image: {
    backgroundImage: `url('/paymentvector.png')`,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.mode === 'light'
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[800],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url('/signupmobile.png')`,

    },
    [theme.breakpoints.down('xs')]: {
      minHeight: '60vh',
      // backgroundColor:
      //   theme.palette.mode === 'light'
      //     ? theme.palette.grey[50]
      //     : theme.palette.grey[800],
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  heading: {
    textAlign: 'center',
    width: 'fit-content',
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  Backcolor: {
    // backgroundColor:
    //   theme.palette.mode === 'light' ? 'white' : theme.palette.grey[800],
  },
  input: {
    width: '50%',
    marginLeft: 20,
  },
  box: {
    paddingLeft: 20,
    marginBottom: theme.spacing(2),
  },
  button: {
    width: 'fit-content',
    margin: 'auto',
  },
  listItem: {
    marginBottom: 0,
  },
  leftGrid: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
    },
  },
  link: {
    cursor: 'pointer',
  },
  payment_button: {
    backgroundColor: '#7638FF',
  }
}));
const VectorImg = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (mobile) {
    return (
      <Box>
        <Image
          src='/payment.png'
          alt='logo'
          width={window.innerWidth}
          height={window.innerWidth / 1.46}
        />
      </Box>
    );
  }
  return (
    <Box>
      <Image src='/payment.png' alt='logo' width={500} height={394} />
    </Box>
  );
};
const RazorpayImg = () => {
  const classes = useStyles();
  const theme = useTheme();
  const source =
    theme.palette.mode === 'light' ? '/razorpay.png' : '/razorpay-dark.png';
  return <img src={source} width='180px' className={classes.box} />;
};
const Payment: React.FC<ComponentProps> = ({
  viewer,
  setSuccessMessage,
  setErrorMessage,
  refetch,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [teamName, setTeamName] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (viewer.step === 'REGISTER') {
      router.push('/dashboard/register');
    }
    if (viewer.step === 'PAYMENT') {
    }
    if (viewer.step === 'TEST') {
      router.push('/dashboard/test');
    }
    if (viewer.step === 'CHOOSE_TEAM') {
      router.push('/dashboard/team');
    }
  }, []);

  const teamDetailResponse = useQuery<GetTeamDetailsQuery>(GetTeamDetails);

  const [CreateOrderFunction, createOrderResponse] = useMutation(CreateOrder);

  const [PayOrderFunction, payOrderResponse] = useMutation(PayOrder);
  const loading = teamDetailResponse.loading;

  if (teamDetailResponse.loading) {
    return <LoadingScreen loading={true} />;
  }

  const handleSuccess = (res: CreateOrderMutation) => {
    const { name, email, phone } = viewer;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      currency: res.createOrder.currency,
      amount: res.createOrder.amount,
      order_id: res.createOrder.id,
      name: 'ISTE SC MANIT',
      description: 'Payment for chimera x',

      handler: async (response: { razorpay_payment_id: any }) => {
        const payOrderInput: PayOrderInput = {
          paymentId: response.razorpay_payment_id,
        };
        await PayOrderFunction({
          variables: { input: payOrderInput },
          onCompleted: () => {
            setSuccessMessage('Payment Successful');
            refetch().then(() => router.push('/dashboard/test'));

          },
          onError: () => setErrorMessage('Payment Failed'),
        });
      },
      prefill: {
        name,
        email,
        mobile: phone,
      },
    };
    const _window = window as any;
    const paymentObject = new _window.Razorpay(options);
    paymentObject.open();
  };

  const handleRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setErrorMessage('Payment Failed');
      return;
    }

    const createOrderInput: CreateOrderInput = {
      teamName: teamName,
      referralCode: referralCode,
    };
    CreateOrderFunction({
      variables: { input: createOrderInput },
      onCompleted: (res) => handleSuccess(res),
      onError: () => {
        setErrorMessage(
          'Payment failed! You might be entering wrong referral code.'
        );
      },
    });
  };

  const disable =
    !Boolean(teamName) ||
    Boolean(viewer.role === 'TEAM_HELPER') ||
    !Boolean(checked);
  const teamHelperDisable = Boolean(viewer.role === 'TEAM_HELPER');

  return (
    <>
      <ScrollDialog
        openDialog={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <div className={classes.root}>
        <CustomDrawer
          name={viewer.name}
          username={viewer.email}
          open={open}
          setOpen={setOpen}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
        <Navbar
          setOpen={setOpen}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
        <Grid
          container
          component='main'
          onClick={() => setOpen(false)}
          className={classes.Backcolor}
        >
          <Grid item xs={12} sm={8} md={6} className={classes.leftGrid}>
            <Box className={classes.heading}>
              <Typography variant='h4'>
                <b>Step-3 , Payment for Chimera-X 2021</b>
              </Typography>
            </Box>

            <Box>
              <List>
                <ListItem alignItems='flex-start'>
                  <ListItemText
                    className={classes.listItem}
                    primary='Enter your team name'
                    secondary={
                      <React.Fragment>
                        {
                          'You / your team will be recognized by your Team name '
                        }
                      </React.Fragment>
                    }
                    primaryTypographyProps={{ variant: 'h6' }}
                  />
                </ListItem>
              </List>

            </Box>
            <Box>
              <TextField

                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
                className={classes.input}
                size='small'
                id='password-input'
                label='Enter Team Name'
                required
                variant='outlined'
                margin='normal'
                disabled={teamHelperDisable}
              />
              <TextField
                // fullWidth
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value);
                }}
                className={classes.input}
                size='small'
                id='password-input'
                label='Enter Referral Code'
                variant='outlined'
                margin='normal'
                disabled={teamHelperDisable}
                helperText={
                  teamHelperDisable
                    ? ''
                    : "If you don't have any referral code , Please leave this field blank"
                }
              />
            </Box>
            <Divider></Divider>
            <Box>
              <ListItem alignItems='flex-start'>
                <ListItemText
                  primary='Verify your team details'
                  secondary={
                    <React.Fragment>
                      {
                        'Check your team details, if anything looks wrong contact us'
                      }
                    </React.Fragment>
                  }
                  primaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
            </Box>
            <Box display='flex' className={classes.box}>
              <Typography>
                {' '}
                <b>Team Status:</b> &nbsp;
              </Typography>
              <Typography>
                {' '}
                {teamDetailResponse.data?.getTeamDetails.status}{' '}
              </Typography>
            </Box>
            <Box display='flex' className={classes.box}>
              <Typography>
                {' '}
                <b>Team Leader:</b> &nbsp;
              </Typography>
              <Typography>
                {' '}
                {teamDetailResponse.data?.getTeamDetails.teamLeader.name} (
                {teamDetailResponse.data?.getTeamDetails.teamLeader.email}){' '}
              </Typography>
            </Box>
            {teamDetailResponse.data?.getTeamDetails.status === 'TEAM' && (
              <Box display='flex' className={classes.box}>
                <Typography>
                  <b> Paired With:</b> &nbsp;
                </Typography>
                <Typography>
                  {' '}
                  {teamDetailResponse.data?.getTeamDetails.teamHelper?.name} (
                  {teamDetailResponse.data?.getTeamDetails.teamHelper?.email})
                </Typography>
              </Box>
            )}

            <Divider></Divider>
            <Box>
              <ListItem alignItems='flex-start'>
                <ListItemText
                  primary='Complete your payment'
                  primaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
            </Box>
            <Box>
              <RazorpayImg />
            </Box>
            <Box>
              <Grid container className={classes.box} alignItems='center'>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    <b>AMOUNT</b>&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    <b> ₹ 100 </b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems='center'>
                <Grid item xs={12}>
                  <Box>
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          color='primary'
                          onChange={() => setChecked(!checked)}
                          disabled={teamHelperDisable}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            I agree to the{' '}
                            <Link
                              className={classes.link}
                              onClick={() => setOpenDialog(true)}
                            >
                              Terms and Condition
                            </Link>{' '}
                            of ISTE-SC-MANIT{' '}
                          </>
                        }
                      />
                    </ListItem>
                    {viewer.role === 'TEAM_HELPER' && (
                      <Box className={classes.box}>
                        <Typography>
                          Please ask your team leader to complete payment
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.box}>
                    <Button
                      color='primary'
                      variant='contained'
                      onClick={handleRazorpay}
                      disabled={disable}
                      className={classes.payment_button}
                    >
                      Proceed for payment
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={4}
            md={6}
            className={classes.image}
            justifyContent='center'
            alignItems='flex-end'
          >
            <VectorImg />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Payment;
