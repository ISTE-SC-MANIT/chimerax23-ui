import React from 'react';
import { createStyles, withStyles, WithStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import Image from 'next/image';
import AudioPlayer from './audioPlayer';
import Typography from '@mui/material/Typography';
import {
  Box,
  Grid,
  TextField,
  Tooltip,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
} from '@mui/material';

import {
  GetQuestionsQuery,
  GetQuestionsQuery_getQuestions,
} from '../../__generated__/GetQuestionsQuery';
import {
  QuestionAnswer,
  QuestionAnswerType,
} from '../../__generated__/globalTypes';
import { Role } from '../../__generated__/globalTypes';
import VideoPlayer from './videoPlayer';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    minHeight: '100vh',
  },
  box: {
    width: '80%',
    border: `3px solid ${theme.palette.divider}`,
  },
  dialogActions: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  nextBtn: {
    // marginRight: 'auto',
    [theme.breakpoints.down('lg')]: {
      margin: theme.spacing(1),
    },
  },
  reviewBtn: {
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
  },
  noSelect: {
    userSelect: 'none',
  },
  imageBox: {
    borderStyle: 'solid',
    borderWidth: theme.spacing(1 / 8),
    borderRadius: theme.spacing(1 / 4),
    borderColor: theme.palette.divider,
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(4),
    },
  },
  videoBox: {
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(4),
    },
  },

  media: {
    height: 200,
  },
  inputs : {
    marginTop: '17px',
    boxSizing: 'border-box' ,
    [theme.breakpoints.down('sm')]: {
      marginTop: '9px',
    },
  }
}));

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle /*disableTypography*/ className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface Props {
  question: GetQuestionsQuery_getQuestions;
  answer: QuestionAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<QuestionAnswer[]>>;
  reviewedAnswers: string[];
  visitedAnswers: string[];
  setReviewedAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  setVisitedAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  currentQuestion: GetQuestionsQuery_getQuestions;
  setCurrentQuestion: any;
  questions: GetQuestionsQuery_getQuestions[];
  role: Role;
}

const QuestionComponent: React.FC<Props> = ({
  question,
  answer,
  setAnswers,
  visitedAnswers,
  setVisitedAnswers,
  reviewedAnswers,
  setReviewedAnswers,
  currentQuestion,
  setCurrentQuestion,
  questions,
  role,
}) => {
  const getQuestionAnswer = (questionNo: number, answerNo: 'ans1' | 'ans2') => {
    if (answerNo === 'ans1') {
      const ans = answer.find((a) => a.questionNumber === questionNo)?.answer;
      return ans ? ans : '';
    } else {
      const ans = answer.find((a) => a.questionNumber === questionNo)?.answer2;
      return ans ? ans : '';
    }
  };

  const [localState, setLocalState] = React.useState<string>('');
  const [localState2, setLocalState2] = React.useState<string>('');

  React.useEffect(() => {
    setLocalState(getQuestionAnswer(question.questionNo, 'ans1'));
    setLocalState2(getQuestionAnswer(question.questionNo, 'ans2'));

    const exists = visitedAnswers.find((answer) => answer === question.id);

    if (!exists) {
      if (question.id) setVisitedAnswers([...visitedAnswers, question.id]);
    }
  }, [question]);

  const classes = useStyles();
  const handleClose = () => { };

  const handleNext = () => {
    const index = questions.findIndex(
      (question) => question.id === currentQuestion.id
    );
      setCurrentQuestion(questions[index + 1]);
  };

  const handlePrevious = () => {
    const index = questions.findIndex(
      (question) => question.id === currentQuestion.id
    );
    setCurrentQuestion(questions[index - 1]);
  };

  const saveAnswer = () => {
    const index = answer.findIndex(
      (answer) => answer.questionNumber === question.questionNo
    );
    let answerCopy = [...answer];
    answerCopy[index].answer = localState;
    answerCopy[index].answer2 = localState2;
    setAnswers(answerCopy);
  };

  const resetAnswer = () => {
    const index = answer.findIndex(
      (answer) => answer.questionNumber === question.questionNo
    );
    let answerCopy = [...answer];
    answerCopy[index].answer = '';
    answerCopy[index].answer2 = '';
    setAnswers(answerCopy);
    setLocalState('');
    setLocalState2('');
  };

  const handleReview = () => {
    const exists = reviewedAnswers.find((answer) => answer === question.id);
    if (!exists) {
      if (question.id) setReviewedAnswers([...reviewedAnswers, question.id]);
    } else {
      let answerCopy = [...reviewedAnswers];
      const i = reviewedAnswers.findIndex((answer) => answer === question.id);
      answerCopy.splice(i, 1);
      setReviewedAnswers(answerCopy);
    }
  };

  const isMarkedForReview = () => {
    const exists = reviewedAnswers.find((answer) => answer === question.id);
    return Boolean(exists);
  };

  const handlePaste = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  return (
    <div>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className={classes.root}
      >
        <Box className={classes.box}>
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Question {question.questionNo}
          </DialogTitle>
          <DialogContent dividers>
            <Typography className={classes.noSelect} gutterBottom>
              {question.question}
            </Typography>
            {question.questionType === 'IMAGE' && (
              <Box className={classes.imageBox}>
                <Paper elevation={0}>
                  <Box>
                    <Image
                      layout={'responsive'}
                      height={100}
                      width={300}
                      src={
                        question.questionAssets ? question.questionAssets : ''
                      }
                      alt='logo'
                    />
                  </Box>
                </Paper>
              </Box>
            )}
            {question.questionType === 'AUDIO' && (
              <Box m={4}>
                <AudioPlayer
                  src={question.questionAssets ? question.questionAssets : ''}
                />
              </Box>
            )}
            {question.questionType === 'VIDEO' && (
              <Box className={classes.videoBox}>
                <VideoPlayer
                  src={question.questionAssets ? question.questionAssets : ''}
                />
              </Box>
            )}
            <Box>
              <TextField
                fullWidth
                multiline
                className={classes.inputs}
                label={question.firstAnswerLabel}
                onChange={(e) => {
                  setLocalState(e.target.value);
                }}
                value={localState}
                onPaste={handlePaste}
                disabled={role === 'TEAM_HELPER'}
              />
            </Box>
            {question.questionAnswerType === 'DOUBLE' && (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  className={classes.inputs}
                  label={question.secondAnswerLabel}
                  onChange={(e) => {
                    setLocalState2(e.target.value);
                  }}
                  value={localState2}
                  onPaste={handlePaste}
                  disabled={role === 'TEAM_HELPER'}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Box style={{ marginRight: 'auto' }} className={classes.nextBtn}>
              <Box>
                <Button
                  onClick={handlePrevious}
                  variant='contained'
                  color='primary'
                  disabled={currentQuestion.questionNo === 1}
                >
                  Previous
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  onClick={handleNext}
                  variant='contained'
                  color='primary'
                  disabled={currentQuestion.questionNo === 30}
                >
                  Next
                </Button>
                &nbsp;&nbsp;&nbsp;
                {role === 'TEAM_LEADER' && (
                  <Button
                    onClick={handleReview}
                    variant='contained'
                    color='primary'
                    className={classes.reviewBtn}
                  >
                    {isMarkedForReview()
                      ? 'Un-mark for review'
                      : 'mark for review'}
                  </Button>
                )}
              </Box>
            </Box>
            {role === 'TEAM_LEADER' && (
              <Button
                onClick={resetAnswer}
                disabled={
                  !Boolean(
                    Boolean(
                      getQuestionAnswer(question.questionNo, 'ans1') ||
                      Boolean(getQuestionAnswer(question.questionNo, 'ans2'))
                    )
                  )
                }
                variant='contained'
                color='primary'
              >
                Reset
              </Button>
            )}
            {role === 'TEAM_LEADER' && (
              <Button
                onClick={currentQuestion.questionNo === 30 ?  saveAnswer : function(event){ 
                    saveAnswer(); handleNext()}
                }
                variant='contained'
                color='primary'
                disabled={Boolean(
                  Boolean(
                    getQuestionAnswer(question.questionNo, 'ans1') ||
                    Boolean(getQuestionAnswer(question.questionNo, 'ans2'))
                  )
                )}
              >
                Save Answer & Next
              </Button>
            )}
          </DialogActions>
        </Box>
      </Grid>
    </div>
  );
};

export default QuestionComponent;
