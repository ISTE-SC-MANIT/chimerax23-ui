import { gql } from '@apollo/client';

export const SubmitQuiz = gql`
  mutation SubmitQuizMutation($input: SubmitQuizInput!) {
    submitQuiz(submitQuizInput: $input) {
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
