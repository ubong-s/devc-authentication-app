import FormBoxFooter from '../components/Forms/FormBoxFooter';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import LoginForm from '../components/Forms/LoginForm';
import useLocalState from '../hooks/useLocalState';
import { Box, PageRoot } from './Pages.styles';

const Login = () => {
   const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

   return (
      <PageRoot>
         <div className='container'>
            {alert.show && (
               <div className={`alert ${alert.type}`}>{alert.text}</div>
            )}
            <Box>
               {/* Form Header */}
               <FormBoxHeader
                  title='Join thousands of learners from around the world'
                  imageUrl='/images/devchallenges.svg'
                  imageAlt='dev changelles logo'
                  text='Master web development by making real-life projects. There
                     are multiple paths for you to choose'
               />

               {/* Login Form */}
               <LoginForm
                  showAlert={showAlert}
                  setLoading={setLoading}
                  hideAlert={hideAlert}
                  loading={loading}
               />

               {/* Form Footer */}
               <FormBoxFooter linkText='Register' linkUrl='/register' />
            </Box>
         </div>
      </PageRoot>
   );
};

export default Login;
