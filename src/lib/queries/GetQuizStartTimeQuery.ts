import { gql } from '@apollo/client';

export const GetQuizStartTime = gql`
  query GetQuizStartTimeQuery {
    getQuizDetails {
      quizStartTime
    }
  }
`;
