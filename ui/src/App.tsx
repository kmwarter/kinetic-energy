import './App.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from './components/views/Cart/Cart';
import Navbar from './components/shared/Navbar/Navbar';
import Collection from './components/views/Collection/Collection';
import Collections from './components/views/Collections/Collections';
import {
  createSessionMutation,
  removeSessionMutation,
  sessionQuery,
  updateSessionMutation,
} from './gql';
import {
  CreateResponse,
  Nft,
  RemoveResponse,
  SessionData,
  UpdateResponse,
} from './types';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
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

      if (!session) {
        sessionStorage.removeItem('kineticSessionId');
        return { session: null };
      }

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
    onSuccess: ({ createSession }) => {
      sessionStorage.setItem('kineticSessionId', createSession.id);

      queryClient.setQueryData(['session'], { session: createSession });
    },
  });

  const updateSessionMutationFn = useMutation<
    UpdateResponse,
    Error,
    { id: string; assets: Nft[] }
  >({
    mutationFn: async ({ id, assets }) => {
      const data: UpdateResponse = await request(
        'http://localhost:4000/graphql',
        updateSessionMutation,
        {
          id,
          assets,
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

  const updateSession = async (id: string, assets: Nft[]) => {
    try {
      await updateSessionMutationFn.mutateAsync({
        id,
        assets,
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

  const toggleCart = () => {
    setCartOpen((prevState) => !prevState);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Cart
          open={cartOpen}
          session={data?.session}
          updateSession={updateSession}
          removeSession={removeSession}
          onCloseClick={toggleCart}
        />
        <Navbar session={data?.session} onCartClick={toggleCart} />
        <Routes>
          <Route path="/" element={<Collections />} />
          <Route
            path="/collection/:slug"
            element={
              <Collection
                session={data?.session}
                createSession={createSession}
                updateSession={updateSession}
                openCart={openCart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
