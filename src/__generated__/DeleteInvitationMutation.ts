/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteInvitationInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteInvitationMutation
// ====================================================

export interface DeleteInvitationMutation_deleteInvitation {
  __typename: "Invitation";
  _id: string | null;
  id: string | null;
  sendersId: string;
  sendersName: string;
  sendersEmail: string;
  receiversName: string;
  receiversEmail: string;
  receiversId: string;
  status: Status;
}

export interface DeleteInvitationMutation {
  deleteInvitation: DeleteInvitationMutation_deleteInvitation;
}

export interface DeleteInvitationMutationVariables {
  input: DeleteInvitationInput;
}
