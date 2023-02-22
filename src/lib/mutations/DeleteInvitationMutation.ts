import { gql, useMutation } from '@apollo/client';

export const DeleteInvititation = gql`
  mutation DeleteInvitationMutation($input: DeleteInvitationInput!) {
    deleteInvitation(deleteInvitationInput: $input) {
      _id
      id
      sendersId
      sendersName
      sendersEmail
      receiversName
      receiversEmail
      receiversId
      status
      status
    }
  }
`;
