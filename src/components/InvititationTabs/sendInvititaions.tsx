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

import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery } from '@apollo/client';
import { GetInvitation } from '../../lib/queries/GetInvitationQuery';
import { GetInvitationQuery } from '../../__generated__/GetInvitationQuery';
import { DeleteInvititation } from '../../lib/mutations/DeleteInvitationMutation';
import { DeleteInvitationMutation } from '../../__generated__/DeleteInvitationMutation';
import { DeleteInvitationInput } from '../../__generated__/globalTypes';

interface Props {
  refetchRef: any;
  send: boolean;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

const SendInvitation: React.FC<Props> = ({
  refetchRef,
  send,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const { data, error, loading, refetch } =
    useQuery<GetInvitationQuery>(GetInvitation);

  const [deleteInvite, DeleteInvitationResponse] =
    useMutation(DeleteInvititation);

  React.useEffect(() => {
    refetch();
  }, [send]);

  if (loading) {
    return (
      <Box ml={32} mt={12}>
        <CircularProgress disableShrink size={60} />
      </Box>
    );
  }

  const handleDelete = (id: string) => {
    const input: DeleteInvitationInput = { invitationId: id };
    // console.log(id);
    deleteInvite({
      variables: { input: input },
      onCompleted: () => {
        setSuccessMessage('Deleted');
        refetchRef();
        refetch();
      },
      onError: (err) => {
        setErrorMessage(err.message);
      },
    });
  };

  const sentInvitations = data?.getInvitations?.sentInvitations;

  return (
    <>
      <List>
        {sentInvitations &&
          sentInvitations.map((invitation) => {
            if (Boolean(invitation))
              return (
                <ListItem key={invitation._id}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src='/dummy.png' />
                  </ListItemAvatar>
                  <ListItemText
                    primary={invitation.receiversName}
                    secondary={invitation.receiversEmail}
                  />
                  <ListItemSecondaryAction>
                   
                    <Tooltip title='Delete Invitation'>
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
            else {
              return null;
            }
          })}
      </List>
    </>
  );
};

export default SendInvitation;
