import { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { NavbarRoot, NavbarProfile, NavbarModal } from './Navbar.styles';
import { Link, useLocation } from 'react-router-dom';
import authService from '../../services/auth';

const Navbar = () => {
   const location = useLocation();
   const [state, setState] = useUserContext();
   const [modalOpen, setModalOpen] = useState(false);

   const { user } = state;

   const logout = () => {
      if (user) {
         authService.logout(user);
         setState({ ...state, user: null });
      }
   };

   return (
      <NavbarRoot className='container'>
         <img src='/images/devchallenges.svg' alt='devchanllenges logo' />
         {user && (
            <NavbarProfile onClick={() => setModalOpen(!modalOpen)}>
               <img
                  src={user.photo ? user.photo : '/images/icons8-account.png'}
                  alt={user.name || user.email}
                  className='avatar'
               />
               <span>{user.name || user.email}</span>
               <img
                  src='/images/icons8-caret.png'
                  alt=''
                  className={modalOpen ? 'caret active' : 'caret'}
               />

               <NavbarModal className={modalOpen ? 'active' : ''}>
                  <Link to='/profile'>
                     <div
                        className={
                           location.pathname === '/profile'
                              ? 'link active'
                              : 'link'
                        }
                     >
                        <img src='/images/icons8-account-dark.png' alt='' />
                        <span>My Profile</span>
                     </div>
                  </Link>
                  <Link to='#'>
                     <div
                        className={
                           location.pathname === '/group-chat'
                              ? 'link active'
                              : 'link'
                        }
                     >
                        <img src='/images/icons8-group-dark.png' alt='' />

                        <span>Group Chat</span>
                     </div>
                  </Link>
                  <hr />
                  <div className='link' onClick={logout}>
                     <img src='/images/icon-logout.svg' alt='' />

                     <span>Logout</span>
                  </div>
               </NavbarModal>
            </NavbarProfile>
         )}
      </NavbarRoot>
   );
};

export default Navbar;
