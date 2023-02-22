import { gql } from '@apollo/client';

export const GetSingleUser = gql`
  query GetSingleUserQuery {
    getSingleUsers {
      _id
      name
      email
      id
      phone
      registered
      strategy
      role
      city
    }
  }
`;
