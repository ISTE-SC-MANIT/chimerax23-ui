import { gql } from '@apollo/client';

export const User = gql`
  query viewer {
    viewer {
      _id
      name
      id
      email
      phone
      registered
      strategy
      role
      step
      city
    }
  }
`;
