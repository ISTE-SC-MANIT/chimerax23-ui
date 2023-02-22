/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AcceptInvitationInput, TeamStatus, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AcceptInvitationMutation
// ====================================================

export interface AcceptInvitationMutation_acceptInvitation {
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

export interface AcceptInvitationMutation {
  acceptInvitation: AcceptInvitationMutation_acceptInvitation;
}

export interface AcceptInvitationMutationVariables {
  input: AcceptInvitationInput;
}
