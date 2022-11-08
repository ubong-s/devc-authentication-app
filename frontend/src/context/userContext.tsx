import { createContext, useContext, useEffect, useState } from 'react';
import userService from '../services/user';

interface UserAppState {
   data: {
      id: string;
      email: string;
      role: 'admin';
   } | null;
   error: string | null;
   loading: boolean;
}

const UserContext = createContext<
   [UserAppState, React.Dispatch<React.SetStateAction<UserAppState>>]
>([{ data: null, error: null, loading: true }, () => {}]);

const UserProvider = ({ children }: any) => {
   const [user, setUser] = useState<UserAppState>({
      data: null,
      loading: true,
      error: null,
   });

   const saveUser = (user: any) => {
      setUser(user);
   };

   const removeUser = () => {
      setUser({
         data: null,
         loading: true,
         error: null,
      });
   };

   const fetchUser = async () => {
      try {
         const data = await userService.showMe();

         saveUser({
            data,
            loading: false,
            error: false,
         });
      } catch (error) {
         removeUser();
      }
   };

   useEffect(() => {
      fetchUser();
   }, []);

   return (
      <UserContext.Provider value={[user, setUser]}>
         {children}
      </UserContext.Provider>
   );
};
export const useUserContext = () => useContext(UserContext);

export { UserProvider };
