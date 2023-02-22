import { gql } from '@apollo/client';

export const GetQuestions = gql`
  query GetQuestionsQuery {
    getQuestions {
      id
      question
      questionAssets
      firstAnswerLabel
      secondAnswerLabel
      questionNo
      questionType
      questionAnswerType
    }
  }
`;
