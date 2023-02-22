/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TeamStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTeamDetailsQuery
// ====================================================

export interface GetTeamDetailsQuery_getTeamDetails_teamLeader {
  __typename: "Member";
  name: string;
  email: string;
  userId: string;
}

export interface GetTeamDetailsQuery_getTeamDetails_teamHelper {
  __typename: "Member";
  name: string;
  email: string;
  userId: string;
}

export interface GetTeamDetailsQuery_getTeamDetails {
  __typename: "TeamResponse";
  teamLeader: GetTeamDetailsQuery_getTeamDetails_teamLeader;
  teamHelper: GetTeamDetailsQuery_getTeamDetails_teamHelper | null;
  status: TeamStatus;
  teamName: string | null;
}

export interface GetTeamDetailsQuery {
  getTeamDetails: GetTeamDetailsQuery_getTeamDetails;
}
