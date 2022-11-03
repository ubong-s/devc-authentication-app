import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';
import { GlobalStyle } from './styles/globalStyles';
import { myTheme } from './styles/myTheme';

const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

function App() {
   return (
      <BrowserRouter>
         <ThemeProvider theme={myTheme.light}>
            <GlobalStyle />
            <Suspense fallback={<Loading />}>
               {/* <Navbar /> */}
               <Routes>
                  <Route path='register' element={<Register />} />
                  <Route path='/' element={<Login />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='edit-profile' element={<EditProfile />} />
               </Routes>
            </Suspense>
         </ThemeProvider>
      </BrowserRouter>
   );
}

export default App;
