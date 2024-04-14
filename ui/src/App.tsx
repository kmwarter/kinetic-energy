import './App.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/shared/Navbar/Navbar';
import Cart from './components/views/Cart/Cart';
import Collection from './components/views/Collection/Collection';
import Collections from './components/views/Collections/Collections';

interface SessionData {
  session: {
    id: string;
    assetIds: string[];
    created_at: string;
    updated_at: string;
  };
}

interface CreateResponse {
  createSession: SessionData['session'];
}

interface UpdateResponse {
  updateSession: SessionData['session'];
}

interface RemoveResponse {
  removeSession: SessionData['session'];
}

const sessionQuery = gql`
  query GetSession($id: String!) {
    session(id: $id) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

const createSessionMutation = gql`
  mutation {
    createSession {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

const updateSessionMutation = gql`
  mutation UpdateSession($id: String!, $assetIds: [String!]!) {
    updateSession(updateSessionInput: { id: $id, assetIds: $assetIds }) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

const removeSessionMutation = gql`
  mutation RemoveSession($id: String!) {
    removeSession(id: $id) {
      id
      assetIds
      created_at
      updated_at
    }
  }
`;

function App() {
  const queryClient = useQueryClient();
  const { data } = useQuery<{
    session: SessionData['session'] | null;
  }>({
    queryKey: ['session'],
    queryFn: async () => {
      const sessionId = sessionStorage.getItem('kineticSessionId');

      if (!sessionId) return { session: null };

      const { session }: { session: SessionData['session'] } = await request(
        'http://localhost:4000/graphql',
        sessionQuery,
        {
          id: sessionId,
        },
      );

      return { session };
    },
  });

  const createSessionMutationFn = useMutation<CreateResponse, Error>({
    mutationFn: async () => {
      const data: CreateResponse = await request(
        'http://localhost:4000/graphql',
        createSessionMutation,
      );

      return data;
    },
  });

  const updateSessionMutationFn = useMutation<
    UpdateResponse,
    Error,
    { id: string; assetIds: string[] }
  >({
    mutationFn: async ({ id, assetIds }) => {
      const data: UpdateResponse = await request(
        'http://localhost:4000/graphql',
        updateSessionMutation,
        {
          id,
          assetIds,
        },
      );

      return data;
    },
    onSuccess: ({ updateSession }) => {
      queryClient.setQueryData(['session'], { session: updateSession });
    },
  });

  const removeSessionMutationFn = useMutation<RemoveResponse, Error, string>({
    mutationFn: async (id) => {
      const data: RemoveResponse = await request(
        'http://localhost:4000/graphql',
        removeSessionMutation,
        {
          id,
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.setQueryData(['session'], null);
    },
  });

  const createSession = async () => {
    try {
      const data = await createSessionMutationFn.mutateAsync();

      return data.createSession.id;
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const updateSession = async () => {
    try {
      const id = data?.session?.id;
      if (!id) return;
      await updateSessionMutationFn.mutateAsync({
        id,
        assetIds: ['987', '876'],
      });
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const removeSession = async () => {
    try {
      const id = data?.session?.id;
      if (!id) return;
      await removeSessionMutationFn.mutateAsync(id);
    } catch (error) {
      console.error('Error removing session:', error);
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Collections} />
          <Route path="/collection/:slug" Component={Collection} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
