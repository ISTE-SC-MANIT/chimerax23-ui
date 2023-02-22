/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrderMutation
// ====================================================

export interface CreateOrderMutation_createOrder {
  __typename: "Order";
  id: string;
  amount: number;
  currency: string;
}

export interface CreateOrderMutation {
  createOrder: CreateOrderMutation_createOrder;
}

export interface CreateOrderMutationVariables {
  input: CreateOrderInput;
}
