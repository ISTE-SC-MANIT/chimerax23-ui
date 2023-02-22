import { gql } from '@apollo/client';

export const PayOrder = gql`
  mutation PayOrderMutation($input: PayOrderInput!) {
    payOrder(payOrderInput: $input) {
      _id
      id
      teamLeadersId
      invitationId
      teamHelpersId
      teamName
      city
      teamStatus
      status
    }
  }
`;
