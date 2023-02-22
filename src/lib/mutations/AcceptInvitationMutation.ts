import { gql, useMutation } from '@apollo/client';

export const AcceptInvititation = gql`
  mutation AcceptInvitationMutation($input: AcceptInvitationInput!) {
    acceptInvitation(acceptInvitationInput: $input) {
      _id
      id
      teamLeadersId
      invitationId
      teamHelpersId
      teamName
      city
      teamStatus
      status
    }
  }
`;
