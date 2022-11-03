import { SocialRoot } from './Social.styles';

const Social = () => {
   return (
      <SocialRoot>
         <li>
            <button type='button' aria-label='Google'>
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
