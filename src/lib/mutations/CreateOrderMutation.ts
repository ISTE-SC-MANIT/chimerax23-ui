import { gql } from '@apollo/client';

export const CreateOrder = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      id
      amount
      currency
    }
  }
`;
