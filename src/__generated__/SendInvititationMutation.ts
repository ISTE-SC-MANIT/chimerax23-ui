/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SendInvititationMutation
// ====================================================

export interface SendInvititationMutation_sendInvitation {
  __typename: "Invitation";
  _id: string | null;
  sendersId: string;
  id: string | null;
  sendersName: string;
  sendersEmail: string;
  receiversName: string;
  receiversEmail: string;
  receiversId: string;
  status: Status;
}

export interface SendInvititationMutation {
  sendInvitation: SendInvititationMutation_sendInvitation;
}

export interface SendInvititationMutationVariables {
  input: InvitationInput;
}
