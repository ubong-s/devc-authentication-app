import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useUserContext } from '../context/userContext';

interface PrivateRouteProps {
   children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
   const [state] = useUserContext();

   if (state.loading) return <Loading />;
   return state.data ? <>{children}</> : <Navigate to='/' />;
};
