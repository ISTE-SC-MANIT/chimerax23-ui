import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { PlayAsIndividual } from '../lib/mutations/PlayAsIndividualMutation';
import { getStep } from '../Utils/status';
import { ComponentProps } from '../pages/_app';

interface Props extends ComponentProps {
  openDialog: boolean;
  handleClose: () => void;
}
const DialogBox: React.FC<Props> = ({
  openDialog,
  handleClose,
  setSuccessMessage,
  setErrorMessage,
  refetch,
}) => {
  const router = useRouter();
  const [Play, playAsIndividualResponse] = useMutation(PlayAsIndividual);

  const handlePlayAsIndividual = () => {
    Play({
      onCompleted: () => {
        setSuccessMessage('Redirecting ....');
        refetch().then((response) => {
          router.push(getStep(response.data.viewer.step));
        });
      },
      onError: () => {
        setErrorMessage('Something went wrong Please try again later!');
      },
    });
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Play as an Individual`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please Note: If you select to play as an individual you&apos;ll no
            longer able to send or receive invitation. Proceed with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handlePlayAsIndividual} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
