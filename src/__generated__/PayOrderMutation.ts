/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PayOrderInput, TeamStatus, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PayOrderMutation
// ====================================================

export interface PayOrderMutation_payOrder {
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

export interface PayOrderMutation {
  payOrder: PayOrderMutation_payOrder;
}

export interface PayOrderMutationVariables {
  input: PayOrderInput;
}
