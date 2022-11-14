import { createContext, useContext, useEffect, useState } from 'react';
import userService from '../services/user';

interface UserAppState {
   user: {
      id: string;
      email: string;
      name?: string;
      role: string;
      photo?: string;
   } | null;
   error: string | null;
   loading: boolean;
}

const UserContext = createContext<
   [UserAppState, React.Dispatch<React.SetStateAction<UserAppState>>]
>([{ user: null, error: null, loading: true }, () => {}]);

const UserProvider = ({ children }: any) => {
   const [user, setUser] = useState<UserAppState>({
      user: null,
      loading: true,
      error: null,
   });

   const saveUser = (user: any) => {
      setUser(user);
   };

   console.log(user);

   const removeUser = () => {
      setUser({
         user: null,
         loading: false,
         error: null,
      });
   };

   const fetchUser = async () => {
      try {
         const data = await userService.showMe();

         saveUser({
            user: data.user,
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
