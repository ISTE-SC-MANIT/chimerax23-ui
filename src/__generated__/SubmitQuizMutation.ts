/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubmitQuizInput, TeamStatus, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitQuizMutation
// ====================================================

export interface SubmitQuizMutation_submitQuiz {
  __typename: "Team";
  _id: string | null;
  id: string | null;
  teamLeadersId: string;
  invitationId: string;
  teamHelpersId: string | null;
  teamName: string | null;
  city: string | null;
  teamStatus: TeamStatus;
  status: PaymentStatus;
}

export interface SubmitQuizMutation {
  submitQuiz: SubmitQuizMutation_submitQuiz;
}

export interface SubmitQuizMutationVariables {
  input: SubmitQuizInput;
}
