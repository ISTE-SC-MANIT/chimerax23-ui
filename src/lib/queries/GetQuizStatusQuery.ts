import { gql } from '@apollo/client';

export const GetQuizStatus = gql`
  query GetQuizStatusQuery {
    getQuizDetails {
      quizStartTime
      userQuizStatus
    }
  }
`;
