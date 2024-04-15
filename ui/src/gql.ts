import { gql } from 'graphql-request';

export const sessionQuery = gql`
  query GetSession($id: String!) {
    session(id: $id) {
      id
      assets {
        identifier
        collection
        name
        description
        image_url
      }
      created_at
      updated_at
    }
  }
`;

export const createSessionMutation = gql`
  mutation {
    createSession {
      id
      assets {
        identifier
        collection
        name
        description
        image_url
      }
      created_at
      updated_at
    }
  }
`;

export const updateSessionMutation = gql`
  mutation UpdateSession($id: String!, $assets: [CreateNftInput!]!) {
    updateSession(updateSessionInput: { id: $id, assets: $assets }) {
      id
      assets {
        identifier
        collection
        name
        description
        image_url
      }
      created_at
      updated_at
    }
  }
`;

export const removeSessionMutation = gql`
  mutation RemoveSession($id: String!) {
    removeSession(id: $id) {
      id
      assets {
        identifier
        collection
        name
        description
        image_url
      }
      created_at
      updated_at
    }
  }
`;

export const assetsQuery = gql`
  query GetAssets {
    assets {
      collection
      name
      description
      banner_image_url
    }
  }
`;

export const nftsQuery = gql`
  query GetNfts($slug: String!) {
    nfts(collection_slug: $slug) {
      identifier
      collection
      name
      description
      image_url
    }
  }
`;
