import { gql } from 'graphql-request';

export const sessionQuery = gql`
  query GetSession($id: String!) {
    session(id: $id) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

export const createSessionMutation = gql`
  mutation {
    createSession {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

export const updateSessionMutation = gql`
  mutation UpdateSession($id: String!, $assetIds: [String!]!) {
    updateSession(updateSessionInput: { id: $id, assetIds: $assetIds }) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

export const removeSessionMutation = gql`
  mutation RemoveSession($id: String!) {
    removeSession(id: $id) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;
