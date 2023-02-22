import { gql } from '@apollo/client';

export const GetTeamDetails = gql`
  query GetTeamDetailsQuery {
    getTeamDetails {
      teamLeader {
        name
        email
        userId
      }
      teamHelper {
        name
        email
        userId
      }
      status
      teamName
    }
  }
`;
