import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import useField from '../../hooks/useField';
import loginService from '../../services/login';
import { Form } from './Form.styles';

interface ShowAlertProps {
   type?: string;
   text: string;
}

interface LoginFormProps {
   showAlert: ({ type, text }: ShowAlertProps) => void;
   setLoading: (boolean: boolean) => void;
   hideAlert: () => void;
   loading: boolean;
}

const LoginForm = ({
   showAlert,
   setLoading,
   hideAlert,
   loading,
}: LoginFormProps) => {
   const { reset: resetEmail, ...email } = useField('text');
   const { reset: resetPassword, ...password } = useField('password');
   const [user, setUser] = useUserContext();
   const navigate = useNavigate();

   const resetValues = () => {
      resetEmail();
      resetPassword();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      hideAlert();
      setLoading(true);

      const loginUser = {
         email: email.value,
         password: password.value,
      };
      try {
         const data = await loginService.login(loginUser);
         showAlert({
            text: `Welcome, ${data.user.email}. Redirecting to dashboard`,
            type: 'success',
         });
         resetValues();
         setLoading(false);
         setUser({ ...user, data: data.user });
         navigate('/profile');
      } catch (error: any) {
         showAlert({ text: error.response.data.msg });
         setLoading(false);
      }
   };

   return (
      <Form onSubmit={handleSubmit}>
         <label htmlFor='email'>
            <span>
               <img src='/images/envelope.svg' alt='' />
            </span>
            <input {...email} placeholder='Email' />
         </label>
         <label htmlFor='password'>
            <span>
               <img src='/images/padlock.svg' alt='' />
            </span>
            <input {...password} placeholder='password' />
         </label>

         <button type='submit' disabled={loading}>
            Login
         </button>
      </Form>
   );
};

export default LoginForm;
