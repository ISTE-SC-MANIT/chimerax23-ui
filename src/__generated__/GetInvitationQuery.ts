/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInvitationQuery
// ====================================================

export interface GetInvitationQuery_getInvitations_sentInvitations {
  __typename: "Invitation";
  _id: string | null;
  id: string | null;
  sendersId: string;
  sendersName: string;
  sendersEmail: string;
  receiversId: string;
  receiversName: string;
  receiversEmail: string;
}

export interface GetInvitationQuery_getInvitations_receivedInvitations {
  __typename: "Invitation";
  _id: string | null;
  id: string | null;
  sendersId: string;
  sendersName: string;
  sendersEmail: string;
  receiversId: string;
  receiversName: string;
  receiversEmail: string;
}

export interface GetInvitationQuery_getInvitations {
  __typename: "InvitationResponse";
  sentInvitations: GetInvitationQuery_getInvitations_sentInvitations[];
  receivedInvitations: GetInvitationQuery_getInvitations_receivedInvitations[];
}

export interface GetInvitationQuery {
  getInvitations: GetInvitationQuery_getInvitations;
}
