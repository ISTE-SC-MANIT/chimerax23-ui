import React, { Dispatch, SetStateAction } from 'react';
import { Drawer, Divider, Box, Button, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import ThemeToggleButton from '../theme/modeToggle';

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
  buttonGroup: {
    minHeight: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#7638FF',
    color: 'white',
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#7638FF',
    },
  },
}));

interface DrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavbarHeader: React.FC<DrawerProps> = ({ open, setOpen }) => {
  const classes = useStyles({ open });
  const router = useRouter();

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
          <Box className={classes.buttonGroup}>
            <Button
              variant='contained'
              onClick={() => router.push('/login')}
              className={classes.button}
            >
              Login
            </Button>
            <Button
              variant='contained'
              onClick={() => router.push('/signup')}
              className={classes.button}
            >
              Sign up
            </Button>
          </Box>
          <Divider />
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

export default NavbarHeader;
