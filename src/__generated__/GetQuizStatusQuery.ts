/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserQuizStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetQuizStatusQuery
// ====================================================

export interface GetQuizStatusQuery_getQuizDetails {
  __typename: "QuizDetailsResponse";
  quizStartTime: string;
  userQuizStatus: UserQuizStatus;
}

export interface GetQuizStatusQuery {
  getQuizDetails: GetQuizStatusQuery_getQuizDetails;
}
