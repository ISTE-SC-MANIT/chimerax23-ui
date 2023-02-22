import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Typography, ListItem, ListItemText } from '@mui/material';
import { QuestionAnswer } from '../../__generated__/globalTypes';
import { GetQuestionsQuery_getQuestions } from '../../__generated__/GetQuestionsQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2, 1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: theme.spacing(8),
      width: theme.spacing(8),
      position: 'relative',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      flexWrap: 'wrap',
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

interface Props {
  questions: GetQuestionsQuery_getQuestions[];
  onQuestionClick: (questionNo: number) => void;
  currentQuestion: GetQuestionsQuery_getQuestions | null;
  reviewedAnswers: string[];
  visitedAnswers: string[];
  answers: QuestionAnswer[];
}

const QuestionPanel: React.FC<Props> = ({
  questions,
  onQuestionClick,
  currentQuestion,
  visitedAnswers,
  reviewedAnswers,
  answers,
}) => {
  const classes = useStyles();

  const getColor = (questionNo: any, questionId: any) => {
    if (currentQuestion) {
      if (questionNo === currentQuestion.questionNo) {
        return { background: '#2196F3', color: '#FFFFFF' };
      }
    }

    const markedForReview = reviewedAnswers.find(
      (answer) => answer === questionId
    );
    if (Boolean(markedForReview)) {
      return { background: 'blue', color: 'white' };
    }
    const isVisitedQuestion = visitedAnswers.find(
      (answer) => answer === questionId
    );
    if (Boolean(isVisitedQuestion)) {
      const answeredQuestion = answers.find((a) => a.questionId === questionId);

      if (answeredQuestion) {
        if (answeredQuestion.answer || answeredQuestion.answer2) {
          return { background: '#1FAA59', color: 'white' };
        }
      }

      return { background: 'red', color: 'white' };
    }

    return { background: 'white', color: 'black' };
  };

  return (
    <div className={classes.root}>
      <Box mb={2}>
        <ListItemText
          primary={'Questions'}
          secondary={'Click on question number to view the question'}
          primaryTypographyProps={{ variant: 'h6' }}
        />
      </Box>

      <Grid container item spacing={2}>
        {questions.map((question) => {
          return (
            <Grid item key={question.id}>
              <Paper
                className={classes.paper}
                elevation={6}
                style={{
                  backgroundColor: getColor(question.questionNo, question.id)
                    .background,
                  color: getColor(question.questionNo, question.id).color,
                }}
                onClick={() => onQuestionClick(question.questionNo)}
              >
                <Box className={classes.box}>{question.questionNo}</Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default QuestionPanel;
