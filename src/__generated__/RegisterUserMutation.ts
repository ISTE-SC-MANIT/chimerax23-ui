/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterUserMutation
// ====================================================

export interface RegisterUserMutation_registerUser {
  __typename: "User";
  name: string;
  id: string | null;
  email: string;
  phone: string;
  college: string | null;
  strategy: string;
}

export interface RegisterUserMutation {
  registerUser: RegisterUserMutation_registerUser;
}

export interface RegisterUserMutationVariables {
  input: UserInput;
}
