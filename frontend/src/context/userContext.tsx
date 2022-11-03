import { createContext, useContext, useState } from 'react';

interface UserAppState {
   data: {
      id: string;
      email: string;
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

   return (
      <UserContext.Provider value={[user, setUser]}>
         {children}
      </UserContext.Provider>
   );
};
export const useUserContext = () => useContext(UserContext);

export { UserProvider };
