import FormBoxFooter from '../components/Forms/FormBoxFooter';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import LoginForm from '../components/Forms/LoginForm';
import { LoginBox, LoginRoot } from './Login.styles';

const Login = () => {
   return (
      <LoginRoot>
         <div className='container'>
            <LoginBox>
               {/* Form Header */}
               <FormBoxHeader
                  title='Join thousands of learners from around the world'
                  imageUrl='/images/devchallenges.svg'
                  imageAlt='dev changelles logo'
                  text='Master web development by making real-life projects. There
                     are multiple paths for you to choose'
               />

               {/* Login Form */}
               <LoginForm />

               {/* Form Footer */}
               <FormBoxFooter linkText='Register' linkUrl='/register' />
            </LoginBox>
         </div>
      </LoginRoot>
   );
};

export default Login;
