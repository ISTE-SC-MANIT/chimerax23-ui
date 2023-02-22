import { gql, useMutation } from '@apollo/client';

export const RegisterUser = gql`
  mutation RegisterUserMutation($input: UserInput!) {
    registerUser(userInfo: $input) {
      name
      id
      email
      phone
      college
      strategy
    }
  }
`;
