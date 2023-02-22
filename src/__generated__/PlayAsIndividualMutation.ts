/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TeamStatus, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PlayAsIndividualMutation
// ====================================================

export interface PlayAsIndividualMutation_playAsIndividual {
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

export interface PlayAsIndividualMutation {
  playAsIndividual: PlayAsIndividualMutation_playAsIndividual;
}
