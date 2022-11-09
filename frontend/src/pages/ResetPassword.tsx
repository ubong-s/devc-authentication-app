import ResetPasswordForm from '../components/Forms/ResetPasswordForm';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import { Box, PageRoot } from './Pages.styles';

const ResetPassword = () => {
   return (
      <PageRoot>
         <div className='container'>
            <Box>
               <FormBoxHeader
                  title='Reset Password'
                  imageUrl='/images/devchallenges.svg'
                  imageAlt='dev challenges logo'
               />
               <ResetPasswordForm />
            </Box>
         </div>
      </PageRoot>
   );
};

export default ResetPassword;
