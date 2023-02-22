/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType, QuestionAnswerType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetQuestionsQuery
// ====================================================

export interface GetQuestionsQuery_getQuestions {
  __typename: "Question";
  id: string | null;
  question: string;
  questionAssets: string | null;
  firstAnswerLabel: string;
  secondAnswerLabel: string | null;
  questionNo: number;
  questionType: QuestionType;
  questionAnswerType: QuestionAnswerType;
}

export interface GetQuestionsQuery {
  getQuestions: GetQuestionsQuery_getQuestions[];
}
