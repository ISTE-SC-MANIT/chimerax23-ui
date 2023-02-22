import { gql } from '@apollo/client';

export const StartQuiz = gql`
  mutation StartQuizMutation {
    startQuiz {
      quizStartTime
    }
  }
`;
