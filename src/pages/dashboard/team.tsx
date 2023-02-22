import React, { Component } from 'react';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Radio,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ComponentProps } from '../_app';
import CustomDrawer from '../../components/navbar/customDrawer';
import VerticalStepper from '../../components/VerticalStepper';
import { ThemeContext } from '../../components/theme';
import { useRouter } from 'next/dist/client/router';
import cookie from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';
import LoadingScreen from '../../components/loadingScreen';
import DialogBox from '../../components/dialog';
import firebaseSDK from '../../firebase';
import nookies from 'nookies';
import { useMutation, useQuery } from '@apollo/client';
import { GetSingleUser } from '../../lib/queries/GetSingleUserQuery';
import {
  GetSingleUserQuery,
  GetSingleUserQuery_getSingleUsers,
} from '../../__generated__/GetSingleUserQuery';
import { SendInvititation } from '../../lib/mutations/SendInvititationMutation';
import { InvitationInput } from '../../__generated__/globalTypes';
import { PlayAsIndividual } from '../../lib/mutations/PlayAsIndividualMutation';
import SendInvitation from '../../components/InvititationTabs/sendInvititaions';
import ReceivedInvitation from '../../components/InvititationTabs/recievedInvitations';
import { getStep } from '../../Utils/status';

class Amount extends Component {
  render() {
    return (
      <>
        <Grid item xs={6} sm={4}>
          <Typography variant='h6' align='center'>
            <b>AMOUNT</b>&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant='h6' align='center'>
            <b> ₹ 100 </b>
          </Typography>
        </Grid>
      </>
    );
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      minheight: '100vh',
    },
    leftGrid: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(8),
      },
    },
    header: {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3),
      },
    },
    radioBtn: {
      margin: 10,
    },
    menuButton: {

      // marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      height: '100%',
    },
    container: {
      height: window.outerHeight + 60,
      // height: window.outerHeight,
      [theme.breakpoints.down('sm')]: {
        height: 'auto',
        paddingBottom: theme.spacing(2),
      },
    },
    dashboardImg: {
      width: '80%',
      [theme.breakpoints.down('sm')]: {
        width: '40%',
      },
    },

    Head_title: {
      fontSize: '2.4rem',
      // textAlign: 'center',
      // margin: 'auto',
    },
    invitation_button: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
      marginBottom: '6px',
      marginTop: '6px',
      backgroundColor: '#7638FF'
    },
    proceed_button: {
      width: 'fit-content',
      margin: 'auto',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      backgroundColor: '#7638FF',
    },
    proceed_button_main: {
      backgroundColor: '#7638FF',
    },
    tab: {
      overflow: 'scroll',
      // color: theme.palette.mode === 'light' ? 'black' : 'white'
    },
    note: {
      padding: theme.spacing(8),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(5),
      },
    },
  })
);

interface userInfo {
  _id: String;
  name: String;
  email: string;
}
const Team: React.FC<ComponentProps> = ({
  viewer,
  setSuccessMessage,
  setErrorMessage,
  refetch,
}) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const [receiver, setReceiver] = React.useState<any>(null);
  const [send, setSend] = React.useState(false);
  const [rendered, setRendered] = React.useState(false);
  const refetchRef = React.useRef<any>(null);
  const [radio, setRadio] = React.useState<'A' | 'B'>('A');
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (viewer.step === 'REGISTER') {
      router.push('/dashboard/register');
    }
    if (viewer.step === 'PAYMENT') {
      router.push('/dashboard/payment');
    }
    if (viewer.step === 'TEST') {
      router.push('/dashboard/test');
    }
    if (viewer.step === 'CHOOSE_TEAM') {
    }
  }, []);

  //Queries And Mutation

  const [sendIntvite, SendInvititationResponse] = useMutation(SendInvititation);
  const [playIndividual, playIndividualResponse] =
    useMutation(PlayAsIndividual);
  const SingleUserResponse = useQuery<GetSingleUserQuery>(GetSingleUser);
  const handleSendInvitation = () => {
    // console.log(receiver);
    const receiverInput: InvitationInput = {
      receiverId: receiver._id,
      receiverEmail: receiver.email,
      receiverName: receiver.name,
    };
    sendIntvite({
      variables: { input: receiverInput },
      onCompleted: () => {
        setSuccessMessage('Invitation Sent');
        setReceiver(null);
        setSend(!send);
        SingleUserResponse.refetch();
      },
      onError: (err) => {
        setErrorMessage('Something went wrong Please try again later!');
      },
    });

    //check this->
    //retry()
    //refetchRef.current && refetchRef.current.retry();
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <DialogBox
        openDialog={openDialog}
        handleClose={handleClose}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        refetch={refetch}
        viewer={viewer}
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
        <Grid container component='main' onClick={() => setOpen(false)}>
          <Grid item xs={12} md={8} className={classes.leftGrid}>
            <Box mt={5} mb={5} className={classes.header}>
              <Grid container justifyContent='flex-start' alignItems='center'>
                <Grid item sm={4} alignItems='center'>
                  <Image
                    src='/dashboard.png'
                    width={240}
                    height={180}
                    className={classes.dashboardImg}
                    alt='logo'
                  />
                </Grid>
                <Grid item sm={8}>
                  <Typography variant='h4' className={classes.Head_title}>
                    <b>
                      Hello,{' '}
                      {viewer.name[0].toUpperCase() + viewer.name.substring(1)}
                    </b>
                  </Typography>
                  <Typography>Welcome to your ChimeraX dashboard</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box ml={2} mb={2}>
              <Typography variant='h5'>
                Step-2, Select whether you want to play as an individual or as a
                team?
              </Typography>
            </Box>
            <Box>
              <Box display='flex' mb={2}>
                <Radio
                  className={classes.radioBtn}
                  checked={radio === 'A'}
                  value='A'
                  name='radio-button-demo'
                  inputProps={{ 'aria-label': 'A' }}
                  onClick={() => setRadio('A')}
                />
                <div>
                  <Typography variant='h6'>Play as an Individual</Typography>
                  <Typography>Be a lone ranger</Typography>
                </div>
              </Box>
              {radio === 'A' && (
                <Box>
                  <Grid container alignItems='center'>
                    <Amount />
                    <Grid item xs={12} sm={4}>
                      <Box className={classes.proceed_button}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            setOpenDialog(true);
                          }}
                          className={classes.proceed_button_main}
                        >
                          PROCEED TO PAY
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box display='flex'>
                <Radio
                  className={classes.radioBtn}
                  checked={radio === 'B'}
                  value='B'
                  name='radio-button-demo'
                  inputProps={{ 'aria-label': 'B' }}
                  onClick={() => setRadio('B')}
                />
                <div>
                  <Typography variant='h6'>Play as a Team</Typography>
                  <Typography>Be a dynamic duo</Typography>
                </div>
              </Box>
            </Box>
            {radio === 'B' && (
              <Box ml={8}>
                <Box display='flex'>
                  <Typography variant='body1'>
                    Send Invitation to your teammate
                  </Typography>
                </Box>
                <Box display='flex'>
                  <Autocomplete
                    id='country-select-demo'
                    sx={{ width: 300 }}
                    options={
                      SingleUserResponse.data?.getSingleUsers
                        ? SingleUserResponse.data?.getSingleUsers
                        : []
                    }
                    onChange={(event: any, newValue: any) => {
                      setReceiver(newValue);
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <Box
                        component='li'
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option.name} ({option.email})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Search Team Member'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={receiver === null}
                    onClick={handleSendInvitation}
                    className={classes.invitation_button}
                  >
                    Send{' '}
                  </Button>
                </Box>
                <Box mt={2} mb={1}>
                  <Grid container>
                    <Amount />
                  </Grid>
                </Box>
              </Box>
            )}
            <Box className={classes.note}>
              <Typography variant='h6' align='justify'>
                <b>Note:</b>
                <br />
                The amount is same for each team whether you play as an
                individual or as a team. If you play as a team, the one who
                sends the invitation becomes the Team Leader and the other
                becomes the Team Helper. The payment can only be done by the
                team leader. The team leader and team helper both will be able
                to see the questions but only the team leader can answer.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} className={classes.container}>
              <Tabs
                value={tab}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor='primary'
                variant='fullWidth'
              >
                <Tab label='Sent Invitations' />
                <Tab label='Received Invitations' />
                classsName={classes.tab}
              </Tabs>
              <Divider />
              {tab === 0 ? (
                <SendInvitation
                  refetchRef={SingleUserResponse.refetch}
                  send={send}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                />
              ) : (
                <ReceivedInvitation
                  viewer={viewer}
                  refetchRef={refetchRef}
                  setSuccessMessage={setSuccessMessage}
                  setErrorMessage={setErrorMessage}
                  refetch={refetch}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Team;
