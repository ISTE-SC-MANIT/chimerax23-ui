import { gql, useMutation } from '@apollo/client';

export const SendInvititation = gql`
  mutation SendInvititationMutation($input: InvitationInput!) {
    sendInvitation(invitationInput: $input) {
      _id
      sendersId
      id
      sendersName
      sendersEmail
      receiversName
      receiversEmail
      receiversId
      status
    }
  }
`;
