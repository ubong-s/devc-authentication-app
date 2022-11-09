import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// components
import Navbar from './components/Navbar/Navbar';

// routes
import { PrivateRoute } from './routes/PrivateRoute';
import { NotLoggedInRoute } from './routes/NotLoggedInRoute';

// context
import { useUserContext } from './context/userContext';

// styles
import { GlobalStyle } from './styles/globalStyles';
import { myTheme } from './styles/myTheme';

// pages
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
   const [state] = useUserContext();

   const { data: user } = state;

   console.log(user);

   return (
      <BrowserRouter>
         <ThemeProvider theme={myTheme.light}>
            <GlobalStyle />

            {user && <Navbar />}
            <Routes>
               <Route
                  path='/register'
                  element={
                     <NotLoggedInRoute>
                        <Register />
                     </NotLoggedInRoute>
                  }
               />
               <Route
                  path='/'
                  element={
                     <NotLoggedInRoute>
                        <Login />
                     </NotLoggedInRoute>
                  }
               />
               <Route path='/verify-email' element={<VerifyEmail />} />

               <Route
                  path='/profile'
                  element={
                     <PrivateRoute>
                        <Profile />
                     </PrivateRoute>
                  }
               />
               <Route
                  path='/edit-profile'
                  element={
                     <PrivateRoute>
                        <EditProfile />
                     </PrivateRoute>
                  }
               />

               <Route
                  path='/forgot-password'
                  element={
                     <NotLoggedInRoute>
                        <ForgotPassword />
                     </NotLoggedInRoute>
                  }
               />

               <Route
                  path='/reset-password'
                  element={
                     <NotLoggedInRoute>
                        <ResetPassword />
                     </NotLoggedInRoute>
                  }
               />
            </Routes>
         </ThemeProvider>
      </BrowserRouter>
   );
}

export default App;
