import FormBoxFooter from '../components/Forms/FormBoxFooter';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import RegisterForm from '../components/Forms/RegisterForm';
import { RegisterBox, RegisterRoot } from './Register.styles';

const Register = () => {
   return (
      <RegisterRoot>
         <div className='container'>
            <RegisterBox>
               {/* Form Header */}
               <FormBoxHeader
                  title='Join thousands of learners from around the world'
                  imageUrl='/images/devchallenges.svg'
                  imageAlt='dev changelles logo'
                  text='Master web development by making real-life projects. There
                     are multiple paths for you to choose'
               />

               {/* Register Form */}
               <RegisterForm />

               {/* Form Footer */}
               <FormBoxFooter linkText='Login' linkUrl='/' />
            </RegisterBox>
         </div>
      </RegisterRoot>
   );
};

export default Register;
