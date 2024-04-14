import './App.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/shared/Navbar/Navbar';
import Cart from './components/views/Cart/Cart';
import Collection from './components/views/Collection/Collection';
import Collections from './components/views/Collections/Collections';
import {
  createSessionMutation,
  removeSessionMutation,
  sessionQuery,
  updateSessionMutation,
} from './gql';
import { CreateResponse, RemoveResponse, SessionData, UpdateResponse } from './types';

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
    const data = await createSessionMutationFn.mutateAsync();

    return data.createSession;
  };

  const updateSession = async (id: string, assetIds: string[]) => {
    try {
      const id = data?.session?.id;
      if (!id) return;

      await updateSessionMutationFn.mutateAsync({
        id,
        assetIds,
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
        <Navbar session={data?.session} />
        <Routes>
          <Route path="/" element={<Collections />} />
          <Route
            path="/collection/:slug"
            element={
              <Collection
                session={data?.session}
                createSession={createSession}
                updateSession={updateSession}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                session={data?.session}
                updateSession={updateSession}
                removeSession={removeSession}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
