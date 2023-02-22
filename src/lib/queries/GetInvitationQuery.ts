import { gql } from '@apollo/client';

export const GetInvitation = gql`
  query GetInvitationQuery {
    getInvitations {
      sentInvitations {
        _id
        id
        sendersId
        sendersName
        sendersEmail
        receiversId
        receiversName
        receiversEmail
      }
      receivedInvitations {
        _id
        id
        sendersId
        sendersName
        sendersEmail
        receiversId
        receiversName
        receiversEmail
      }
    }
  }
`;
