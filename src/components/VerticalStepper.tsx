import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginLeft: '22px'
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

function getSteps() {
  return [
    'Registration',
    'Select your Teammate',
    'Complete your payment',
    'Start Quiz'
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `Register`;
    case 1:
      return 'Select team';
    case 2:
      return "Payment";
    case 3:
      return `Test`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const router = useRouter()
  const paths = router.route.split("/")[2]


  React.useEffect(() => {
    if (paths === "register") {
      setActiveStep(0)
    }
    if (paths === "team") {
      setActiveStep(1)
    }
    if (paths === "payment") {
      setActiveStep(2)
    }
    if (paths === "test") {
      setActiveStep(3)
    }
  }, [paths])



  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - You have successfully registered for ChimeraX. Team ISTE wishes you the best of luck! </Typography>

        </Paper>
      )}
    </div>
  );
}