import { SocialRoot } from './Social.styles';
import authService from '../../services/auth';

const Social = () => {
   const googleLogin = async () => {
      await authService.loginWithGoogle();
   };

   return (
      <SocialRoot>
         <li>
            <button type='button' aria-label='Google' onClick={googleLogin}>
               <img src='images/Google.svg' alt='Google icon' />
            </button>
         </li>
         <li>
            <button type='button' aria-label='facebook'>
               <img src='images/Facebook.svg' alt='facebook icon' />
            </button>
         </li>
         <li>
            <button type='button' aria-label='Twitter'>
               <img src='images/Twitter.svg' alt='Twitter icon' />
            </button>
         </li>
         <li>
            <button type='button' aria-label='Github'>
               <img src='images/Github.svg' alt='Github icon' />
            </button>
         </li>
      </SocialRoot>
   );
};

export default Social;
