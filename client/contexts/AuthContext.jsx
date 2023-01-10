import { createContext, useContext, useEffect, useReducer } from 'react';

import axiosClient from '@/lib/axios';
import { bearerToken } from '@/lib/helper';

const StateContext = createContext({
  isAuthenticated: false,
  user: null,
  isLoading: true,
});
StateContext.displayName = 'AuthState';

const DispatchContext = createContext(null);
DispatchContext.displayName = 'AuthDispatch';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null || token === undefined) {
          return;
        }

        const res = await axiosClient.get('/auth/checkData', {
          headers: { ...bearerToken() },
          withCredentials: false,
        });

        dispatch('LOGIN', res.data.user);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        dispatch('STOP_LOADING');
      }
    };

    // TODO: run load user
    loadUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
