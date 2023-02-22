import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Timer from './timer';
import { Divider, ListItemText } from '@mui/material';
import QuestionPanel from './questionPanel';
import Stats from './statistics';
import QuestionComponent from './questionComponent';
import { ComponentProps } from '../../pages/_app';
import LoadingScreen from '../loadingScreen';
import { useRouter } from 'next/router';
import SubmitQuizBox from './submitquiz';
import CustomDrawer from '../navbar/customDrawer';
import Navbar from '../navbar/Navbar';
import InstructionsDialog from './InstructionsDialog';
import { Theme } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetQuestionsQuery,
  GetQuestionsQuery_getQuestions,
} from '../../__generated__/GetQuestionsQuery';
import { GetQuestions } from '../../lib/queries/GetQuestionsQuery';
import { GetQuizStartTimeQuery } from '../../__generated__/GetQuizStartTimeQuery';
import { GetQuizStartTime } from '../../lib/queries/GetQuizStartTimeQuery';
import {
  QuestionAnswer,
  SubmitQuizInput,
} from '../../__generated__/globalTypes';
import { SubmitQuiz } from '../../lib/mutations/SubmitQuizMutation';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '90vh',
  },
  paper: {
    margin: theme.spacing(2, 4),
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
  divider: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  insBtn: {
    marginBottom: theme.spacing(1),
  },
}));

interface QuizPageProps extends ComponentProps {
  setQuizStatus: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({
  viewer,
  setSuccessMessage,
  setErrorMessage,
  setQuizStatus,
  refetch,
}) => {
  const classes = useStyles();
  const questionsResponse = useQuery<GetQuestionsQuery>(GetQuestions);
  const quizStartTimeResponse =
    useQuery<GetQuizStartTimeQuery>(GetQuizStartTime);

  const [currentQuestion, setCurrentQuestion] =
    React.useState<GetQuestionsQuery_getQuestions | null>(null);

  const [SubmitQuizFunction, submitQuizResponse] = useMutation(SubmitQuiz);

  const [answer, setAnswer] = React.useState<QuestionAnswer[]>([]);
  const [reviewedAnswers, setReviewedAnswers] = React.useState<string[]>([]);
  const [visitedAnswers, setVisitedAnswers] = React.useState<string[]>([]);
  const [submit, setSubmit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();

  const handleClose = () => setSubmit(false);

  React.useEffect(() => {
    if (questionsResponse.data) {
      const questions = questionsResponse.data.getQuestions;
      setCurrentQuestion(questions[0]);
      const answerMap: QuestionAnswer[] = questions.map((question) => {
        return {
          answer: '',
          answer2: '',
          questionId: question.id ? question.id : '',
          questionNumber: question.questionNo,
        };
      });
      setAnswer(answerMap);
    }
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [questionsResponse.data]);

  const alertUser = (e: any) => {
    e.preventDefault()
    e.returnValue = ''
  }

  if (questionsResponse.loading || quizStartTimeResponse.loading) {
    return <LoadingScreen loading />;
  }

  const handleQuestionClick = (questionNo: number) => {
    if (questionsResponse.data) {
      const clickedQuestion = questionsResponse.data.getQuestions.find(
        (ques) => ques.questionNo === questionNo
      );
      if (clickedQuestion) setCurrentQuestion(clickedQuestion);
    }
  };

  const handleSubmitQuizMutation = () => {
    const input: SubmitQuizInput = { responses: answer };

    SubmitQuizFunction({
      variables: {
        input,
      },
      onCompleted: () => {
        setSuccessMessage('Quiz was successfully Submitted');
        setQuizStatus();
      },
      onError: () => {
        setErrorMessage('Something went wrong');
        setQuizStatus();
      },
    });
  };

  return (
    <>
      <InstructionsDialog
        viewer={viewer}
        openDialog={openDialog}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        refetch={refetch}
        onClose={() => setOpenDialog(false)}
      />
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
      <SubmitQuizBox
        submit={submit}
        handleClose={handleClose}
        handleSubmit={handleSubmitQuizMutation}
      />
      <div className={classes.root} onClick={() => setOpen(false)}>
        <Grid container component='main' className={classes.root}>
          <CssBaseline />
          <Grid item xs={12} md={6} lg={8} style={{ position: 'relative' }}>
            {currentQuestion ? (
              <QuestionComponent
                question={currentQuestion}
                answer={answer}
                setAnswers={setAnswer}
                reviewedAnswers={reviewedAnswers}
                setReviewedAnswers={setReviewedAnswers}
                visitedAnswers={visitedAnswers}
                setVisitedAnswers={setVisitedAnswers}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                questions={
                  questionsResponse.data
                    ? questionsResponse.data.getQuestions
                    : []
                }
                role={viewer.role}
              />
            ) : (
              <LoadingScreen loading />
            )}
            <Grid
              container
              item
              xs={12}
              justifyContent='center'
              alignItems='center'
              className={classes.insBtn}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenDialog(true)}
              >
                Instructions
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Box display='flex'>
                <Avatar className={classes.avatar}>
                  <AccessAlarmIcon />
                </Avatar>
                <Box mt={1}>
                  <Timer
                    startTime={quizStartTimeResponse.data}
                    onTimeUp={handleSubmitQuizMutation}
                  />
                </Box>
              </Box>
              <Divider variant='middle' className={classes.divider} />
              <QuestionPanel
                questions={
                  questionsResponse.data
                    ? questionsResponse.data.getQuestions
                    : []
                }
                onQuestionClick={handleQuestionClick}
                currentQuestion={currentQuestion}
                reviewedAnswers={reviewedAnswers}
                answers={answer}
                visitedAnswers={visitedAnswers}
              />
              <Divider variant='middle' className={classes.divider} />
              {viewer.role === 'TEAM_LEADER' && (
                <>
                  {' '}
                  <Stats
                    reviewedAnswers={reviewedAnswers}
                    answers={answer}
                    visitedAnswers={visitedAnswers}
                  />
                  <Divider variant='middle' className={classes.divider} />
                  <Box mb={2} width='100%'>
                    <ListItemText
                      primary={'Submit Quiz'}
                      secondary={
                        'Quiz will be submitted automatically when time is over'
                      }
                      primaryTypographyProps={{ variant: 'h6' }}
                    />
                  </Box>
                  <Button
                    color='primary'
                    variant='contained'
                    // onClick={() => handleSubmitQuizMutation()}
                    onClick={() => {
                      setSubmit(true);
                    }}
                  >
                    SUBMIT
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default QuizPage;
