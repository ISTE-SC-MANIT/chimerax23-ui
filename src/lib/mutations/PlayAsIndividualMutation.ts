import { gql, useMutation } from '@apollo/client';

export const PlayAsIndividual = gql`
  mutation PlayAsIndividualMutation {
    playAsIndividual {
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
