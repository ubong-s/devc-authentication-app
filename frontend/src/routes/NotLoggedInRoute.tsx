import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useUserContext } from '../context/userContext';

interface NotLoggedInRouteProps {
   children: React.ReactNode;
}

export const NotLoggedInRoute = ({ children }: NotLoggedInRouteProps) => {
   const [state] = useUserContext();

   if (state.loading) return <Loading />;
   return state.data ? <Navigate to='/profile' /> : <>{children}</>;
};
