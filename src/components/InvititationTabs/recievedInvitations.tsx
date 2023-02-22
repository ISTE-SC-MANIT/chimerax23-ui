import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
  Tooltip,
  Box,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import AcceptInvitation from './acceptInvitations';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteInvitationInput } from '../../__generated__/globalTypes';
import { DeleteInvitationMutation } from '../../__generated__/DeleteInvitationMutation';
import { DeleteInvititation } from '../../lib/mutations/DeleteInvitationMutation';
import { GetInvitationQuery } from '../../__generated__/GetInvitationQuery';
import { GetInvitation } from '../../lib/queries/GetInvitationQuery';
import { ComponentProps } from '../../pages/_app';
interface Props extends ComponentProps {
  refetchRef: any;
}

const ReceivedInvitation: React.FC<Props> = ({
  refetchRef,
  setSuccessMessage,
  setErrorMessage,
  refetch,
  viewer
}) => {
  const invitationResponse = useQuery<GetInvitationQuery>(GetInvitation);

  const [details, setDetails] = React.useState({
    userId: '',
    invitationId: '',
    name: '',
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [deleteInvite, DeleteInvitationResponse] =
    useMutation(DeleteInvititation);
  // to receive invitation without Reloading

  React.useEffect(() => {
    const interval = setInterval(() => {
      invitationResponse.refetch();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  if (invitationResponse.loading) {
    return (
      <Box ml={32} mt={12}>
        <CircularProgress disableShrink size={60} />
      </Box>
    );
  }

  const handleDelete = (id: string) => {
    const input: DeleteInvitationInput = { invitationId: id };
    deleteInvite({
      variables: { input: input },
      onCompleted: () => {
        setSuccessMessage('Deleted');
      },
      onError: (err) => {
        setErrorMessage(err.message);
      },
    });
    invitationResponse.refetch();
  };

  const receivedInvitation =
    invitationResponse.data?.getInvitations?.receivedInvitations;

  return (
    <>
      <AcceptInvitation
        name={details.name}
        invitationId={details.invitationId}
        userId={details.userId}
        open={open}
        handleClose={handleClose}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        refetch={refetch}
        viewer={viewer}
      />
      <List>
        {receivedInvitation &&
          receivedInvitation.map((invitation) => {
            if (Boolean(invitation))
              return (
                <ListItem key={invitation._id}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src='/dummy.png' />
                  </ListItemAvatar>
                  <ListItemText
                    primary={invitation.sendersName}
                    secondary={invitation.sendersEmail}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title='Accept Invitation'>
                      <IconButton
                        color='primary'
                        aria-label='Check'
                        onClick={() => {
                          setDetails({
                            userId: invitation.sendersId,
                            name: invitation.sendersName,
                            invitationId: invitation._id ? invitation._id : '',
                          });
                          setOpen(true);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title='Reject Invitation'>
                      <IconButton
                        color='secondary'
                        aria-label='delete'
                        onClick={() =>
                          handleDelete(invitation._id ? invitation._id : '')
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            else return null;
          })}
      </List>
    </>
  );
};

export default ReceivedInvitation;
