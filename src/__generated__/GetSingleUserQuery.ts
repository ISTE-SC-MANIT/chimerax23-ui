/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetSingleUserQuery
// ====================================================

export interface GetSingleUserQuery_getSingleUsers {
  __typename: "User";
  _id: string | null;
  name: string;
  email: string;
  id: string | null;
  phone: string;
  registered: boolean;
  strategy: string;
  role: Role;
  city: string;
}

export interface GetSingleUserQuery {
  getSingleUsers: GetSingleUserQuery_getSingleUsers[];
}
