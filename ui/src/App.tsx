import './App.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { ChangeEvent, useState } from 'react';

interface SessionData {
  session: {
    id: string;
    productIds: string[];
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
      productIds
      created_at
      updated_at
    }
  }
`;

const createSessionMutation = gql`
  mutation {
    createSession {
      id
      productIds
      created_at
      updated_at
    }
  }
`;

const updateSessionMutation = gql`
  mutation UpdateSession($id: String!, $productIds: [String!]!) {
    updateSession(updateSessionInput: { id: $id, productIds: $productIds }) {
      id
      productIds
      created_at
      updated_at
    }
  }
`;

const removeSessionMutation = gql`
  mutation RemoveSession($id: String!) {
    removeSession(id: $id) {
      id
      productIds
      created_at
      updated_at
    }
  }
`;

function App() {
  const queryClient = useQueryClient();
  const [sessionInput, setSessionInput] = useState('');
  const [newSessionId, setNewSessionId] = useState<string | null>(null);
  const { isPending, isError, data, error } = useQuery<{
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

  const onSessionInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSessionInput(event.target.value);
  };

  const changeSessionToken = () => {
    sessionStorage.setItem('kineticSessionId', sessionInput);
  };

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
    { id: string; productIds: string[] }
  >({
    mutationFn: async ({ id, productIds }) => {
      const data: UpdateResponse = await request(
        'http://localhost:4000/graphql',
        updateSessionMutation,
        {
          id,
          productIds,
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

      setNewSessionId(data.createSession.id);
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
        productIds: ['987', '876'],
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

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="App">
      Current Session Id
      <div>{data?.session?.id}</div>
      Session Products
      <div>
        {data?.session?.productIds.map((productId) => {
          return <div key={productId}>{productId}</div>;
        })}
      </div>
      <div>
        Created Session
        <div>{newSessionId}</div>
        <button onClick={createSession}>Create Session Token</button>
      </div>
      <div>
        <button onClick={updateSession}>Update Session Token</button>
      </div>
      <div>
        <button onClick={removeSession}>Remove Session Token</button>
      </div>
      <div>
        <input onChange={onSessionInputChange} value={sessionInput} />
        <button onClick={changeSessionToken}>Change Session Token</button>
      </div>
    </div>
  );
}

export default App;
