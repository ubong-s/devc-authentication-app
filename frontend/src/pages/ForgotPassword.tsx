import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import { Box, PageRoot } from './Pages.styles';

const ForgotPassword = () => {
   return (
      <PageRoot>
         <div className='container'>
            <Box>
               <FormBoxHeader
                  title='Forgot Password'
                  imageUrl='/images/devchallenges.svg'
                  imageAlt='dev challenges logo'
               />
               <ForgotPasswordForm />
            </Box>
         </div>
      </PageRoot>
   );
};

export default ForgotPassword;
