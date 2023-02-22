import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { AcceptInvititation } from '../../lib/mutations/AcceptInvitationMutation';
import { AcceptInvitationInput } from '../../__generated__/globalTypes';
import { ComponentProps } from '../../pages/_app';

interface Props extends ComponentProps {
  name: string;
  userId: string;
  invitationId: string;
  open: boolean;
  handleClose: () => void;
}
const AcceptInvitationPage: React.FC<Props> = ({
  name,
  userId,
  invitationId,
  open,
  handleClose,
  setSuccessMessage,
  setErrorMessage,
  refetch,
}) => {
  const router = useRouter();
  const [accpetInvite, AcceptInvitationResponse] =
    useMutation(AcceptInvititation);
  const handleSubmit = () => {
    const input: AcceptInvitationInput = {
      invitationId,
      receiverId: userId,
    };

    accpetInvite({
      variables: { input: input },
      onCompleted: () => {
        setSuccessMessage('Teammate Selected');
        refetch().then(() => router.push('/dashboard/payment'));
      },
      onError: (err) => {
        setErrorMessage(err.message);
      },
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Accept Invitation from ${name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please Note: Accepting this invitation is irreversible. You will not
            be able to send or receive invitations after accepting and your team
            will be confirmed. You&apos;ll be your Team Helper.
            <br />
            Proceed with caution.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleSubmit} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptInvitationPage;
