import React, { Dispatch, SetStateAction } from 'react';
import { Drawer, Divider, Avatar, Box, Typography, Fade } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import clsx from 'clsx';
import ThemeToggleButton from '../theme/modeToggle';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GamepadIcon from '@mui/icons-material/Gamepad';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/dist/client/router';
import cookie from 'js-cookie';
import VerticalStepper from '../VerticalStepper';
import firebase from 'firebase/app';
import { GetTeamDetailsQuery } from '../../__generated__/GetTeamDetailsQuery';
import { OperationVariables, QueryResult } from '@apollo/client';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: { justifyContent: 'space-between', overflow: 'hidden' },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  mobileMenu: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(2),
    zIndex: theme.zIndex.drawer,
  },

  title : {
     padding:'12px',
  } ,
  upperHalf: {},
  lowerHalf: {},
}));

interface DrawerProps {
  name: string;
  username: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
  teamDetailResponse?: QueryResult<GetTeamDetailsQuery, OperationVariables>;
}

const CustomDrawer: React.FC<DrawerProps> = ({
  name,
  username,
  open,
  setOpen,
  setSuccessMessage,
  setErrorMessage,
  teamDetailResponse,
}) => {
  const classes = useStyles({ open });
  const router = useRouter();
  const icons = [
    {
      label: 'Contest',
      icon: <GamepadIcon />,
      onClick: () => {
        router.push('/protectedPages/dashboard');
      },
    },
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => {
        router.push('/protectedPages/dashboard');
      },
    },
    {
      label: 'Update Info',
      icon: <InfoIcon />,
      onClick: () => {
        router.push('/protectedPages/updateProfile');
      },
    },
    {
      label: 'Leader-Board',
      icon: <ImportantDevicesIcon />,
      onClick: () => {
        router.push('/protectedPages/dashboard');
      },
    },
    {
      label: 'Log Out',
      icon: <ExitToAppIcon />,
      onClick: () => {
        setSuccessMessage('Logged out');
        cookie.remove('authorization');
        router.push('/');
      },
    },
  ];

  const userPhoto = firebase.auth().currentUser?.photoURL;

  return (
    <>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div>
          <Box
            paddingTop={2}
            paddingBottom={2}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <Avatar src={userPhoto ? userPhoto : ''}>
              {name[0].toUpperCase()}
            </Avatar>
            <Fade in={open}>
              <Typography variant='subtitle2'>
                {name[0].toUpperCase() + name.substring(1)}
              </Typography>
            </Fade>
            <Fade in={open}>
              <Typography variant='subtitle2'>{username}</Typography>
            </Fade>
          </Box>
          <Divider />
          <Box>
            <VerticalStepper />
          </Box>
          <Divider />
        </div>
        <div>
          <Box
            paddingTop={2}
            paddingBottom={8}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            {teamDetailResponse && (
              <>
                <Fade in={open}>
                  <Typography variant='subtitle2' className={classes.title} >
                    Team Name:{' '}
                    {teamDetailResponse.data?.getTeamDetails.teamName}
                  </Typography>
                </Fade>
                <Fade in={open}>
                  <Typography variant='subtitle2'  className={classes.title}>
                    Team Status:{' '}
                    {teamDetailResponse.data?.getTeamDetails.status}
                  </Typography>
                </Fade>
                <Fade in={open}>
                  <Typography variant='subtitle2'  className={classes.title}>
                    Team Leader:{' '}
                    {teamDetailResponse.data?.getTeamDetails.teamLeader.name}
                  </Typography>
                </Fade>
                {teamDetailResponse.data?.getTeamDetails.teamHelper && (
                  <Fade in={open}>
                    <Typography variant='subtitle2'  className={classes.title}>
                      Team Helper:{' '}
                      {teamDetailResponse.data?.getTeamDetails.teamHelper?.name}
                    </Typography>
                  </Fade>
                )}
              </>
            )}
          </Box>
        </div>
        <div>
          <Fade in={open}>
            <Box
              paddingBottom={2}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <ThemeToggleButton />
            </Box>
          </Fade>

          <Divider />
          <Box
            height={50}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <IconButton onClick={() => setOpen((o) => !o)}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        </div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
