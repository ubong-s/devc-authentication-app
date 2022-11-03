import FormBoxFooter from '../components/Forms/FormBoxFooter';
import FormBoxHeader from '../components/Forms/FormBoxHeader';
import RegisterForm from '../components/Forms/RegisterForm';
import useLocalState from '../hooks/useLocalState';
import { RegisterBox, RegisterRoot } from './Register.styles';

const Register = () => {
   const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

   return (
      <RegisterRoot>
         <div className='container'>
            {alert.show && (
               <div className={`alert ${alert.type}`}>{alert.text}</div>
            )}
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
               <RegisterForm
                  showAlert={showAlert}
                  setLoading={setLoading}
                  hideAlert={hideAlert}
                  loading={loading}
               />

               {/* Form Footer */}
               <FormBoxFooter linkText='Login' linkUrl='/' />
            </RegisterBox>
         </div>
      </RegisterRoot>
   );
};

export default Register;
