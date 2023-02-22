import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import {
  Box,
  ListItem,
  ListItemText,
  Paper,
  Button,
  ListItemIcon,
  List,
  Grid,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/dist/client/router';
import Navbar from '../navbar/Navbar';
import CustomDrawer from '../navbar/customDrawer';
import { ComponentProps } from '../../pages/_app';
import { useQuery } from '@apollo/client';
import { GetTeamDetailsQuery } from '../../__generated__/GetTeamDetailsQuery';
import { GetTeamDetails } from '../../lib/queries/GetTeamDetailsQuery';
import LoadingScreen from '../loadingScreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      backgroundColor: '',
      minHeight: '80vh',
      margin: 'auto',
      padding: 'auto',
      paddingBottom: '6px',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      marginBottom: theme.spacing(1),
    },
    fullList: {
      width: 'auto',
    },
    sublist: {
      marginLeft: theme.spacing(3),
    },
    paper: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(4),
      padding: theme.spacing(2),
      borderRadius: '25px',
      [theme.breakpoints.down('md')]: {
        width: '96%',
      },
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },

    button: {
      margin: 'auto',
    },

    heading: {
      color: 'black',
      marginBottom: theme.spacing(4),
      paddingTop: '40px',
    },
    subHeading: {
      color: '#001831',
      fontSize: '1.2rem',
    },
    details: {
      textAlign: 'center',
    },
    center: {
      width: 'fit-content',
      margin: 'auto',
    },

    text: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        marginTop: '165px',
        marginLeft: theme.spacing(2),
      },
    },
    review: {
      padding: theme.spacing(2, 1),
      height: theme.spacing(6),
      width: theme.spacing(6),
      position: 'relative',
      borderRadius: '50%',
    },
    box: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
    },
  })
);
interface Props extends ComponentProps {
  page: string;
}

const Instructions: React.FC<Props> = ({
  page,
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

  const quizHandle = () => {
    router.push('/dashboard/test');
  };

  if (teamDetailResponse.loading) {
    return <LoadingScreen loading={true} />;
  }
  return (
    <div className={classes.root}>
      {page === 'instructions' ? (
        <>
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
        </>
      ) : (
        <></>
      )}
      <Grid container onClick={() => setOpen(false)}>
        <Grid container alignItems='center' justifyContent='center'>
          <Box
            display='flex'
            flexDirection='column'
            textAlign='center'
            margin={3}
          >
            <Typography variant='h3'>
              <b>Instructions</b>
            </Typography>
            <Typography variant='h5'>
              Read the instructions carefully before attempting the quiz.
            </Typography>
          </Box>
        </Grid>
        <Grid container alignItems='center' justifyContent='center'>
          <Box>
            <Paper className={classes.paper} elevation={8}>
              <List component='nav' aria-label='Instructions for Test'>
                <ListItem>
                  <ListItemText>
                    1{')'} The test will begin at{' '}
                    <b>4:00 pm IST and end at 4:30 pm IST</b>.
                  </ListItemText>
                </ListItem>{' '}
                <ListItem>
                  <ListItemText>
                    2{')'}{' '}
                    <b>
                      The “Start Test” button will be disabled at sharp 4:05 pm
                      IST.
                    </b>{' '}
                    The button will not be enabled again. Hence, all
                    participants must start the quiz by 4:05 pm IST.{' '}
                  </ListItemText>
                </ListItem>{' '}
                <ListItem>
                  <ListItemText>
                    3{')'}Refreshing/Reloading is prohibited.
                     Any attempt to do so will result in erasure of responses.{' '}
                  </ListItemText>
                </ListItem>{' '}
                <ListItem>
                  <ListItemText>
                    4{')'} There can be a maximum of 2 members in a team. The
                    member who made the payment is the Team Leader and the other
                    member (if it’s a team) will be the Team Helper.
                  </ListItemText>
                </ListItem>{' '}
                <ListItem>
                  <ListItemText>
                    5{')'} The team leader and team helper both will be able to
                    see the questions but only the team leader can answer, see
                    the statistics and submit the quiz. The team helper
                    won&apos;t be able to do any of the above actions.
                  </ListItemText>
                </ListItem>{' '}
                <ListItem>
                  <ListItemText>
                    6{')'} Replacement of any participant of a team is not
                    allowed after registration.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    7{')'} The total number of questions in the quiz is 30.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    8{')'} Each correct answer gets 2 marks and no marks will be
                    deducted for a wrong answer or an unanswered question.{' '}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    9{')'} Some questions are divided into 2 parts. Each part
                    will hold 1 mark for the correct answer and 0 for wrong or
                    unattempted.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    10{')'} Make sure to save your answers whenever a question
                    is attempted.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    11{')'} Marked for review questions would not be evaluated
                    and counted as unattempted.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    12{')'} Do not use special characters {'('}ex: !/*=#${')'}.
                    Make sure to use an appropriate single space between 2 words
                    in an answer and no more than that. Write full words and use
                    their correct spellings.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    13{')'} The quiz will automatically submit once the timer
                    runs out.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <Grid
                      container
                      alignItems='center'
                      className={classes.list}
                    >
                      <Box>
                        <Paper
                          elevation={6}
                          className={classes.review}
                          style={{ backgroundColor: 'green', color: 'white' }}
                        >
                          <Box className={classes.box}>15</Box>
                        </Paper>
                      </Box>
                      <Box pl={2}>Answered Questions</Box>
                    </Grid>
                    <Grid
                      container
                      alignItems='center'
                      className={classes.list}
                    >
                      <Box>
                        <Paper
                          elevation={6}
                          className={classes.review}
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          <Box className={classes.box}>8</Box>
                        </Paper>
                      </Box>
                      <Box pl={2}>Questions not answered</Box>
                    </Grid>
                    <Grid
                      container
                      alignItems='center'
                      className={classes.list}
                    >
                      <Box>
                        <Paper
                          elevation={6}
                          className={classes.review}
                          style={{ backgroundColor: 'blue', color: 'white' }}
                        >
                          <Box className={classes.box}>5</Box>
                        </Paper>
                      </Box>
                      <Box pl={2}>Questions marked for review</Box>
                    </Grid>
                    <Grid container alignItems='center'>
                      <Box>
                        <Paper
                          elevation={6}
                          className={classes.review}
                          style={{ backgroundColor: 'white', color: 'grey' }}
                        >
                          <Box className={classes.box}>2</Box>
                        </Paper>
                      </Box>
                      <Box pl={2}>Questions not visited</Box>
                    </Grid>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <Box textAlign='center'>
                      <Typography variant='h6'>
                        <b>Best of Luck!</b>
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Instructions;
