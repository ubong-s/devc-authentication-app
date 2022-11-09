import useField from '../../hooks/useField';
import authService from '../../services/auth';
import { Form } from './Form.styles';

interface ShowAlertProps {
   type?: string;
   text: string;
}

interface RegisterFormProps {
   showAlert: ({ type, text }: ShowAlertProps) => void;
   setLoading: (boolean: boolean) => void;
   hideAlert: () => void;
   loading: boolean;
}

const RegisterForm = ({
   showAlert,
   setLoading,
   hideAlert,
   loading,
}: RegisterFormProps) => {
   const { reset: resetEmail, ...email } = useField('text');
   const { reset: resetPassword, ...password } = useField('password');
   const { reset: resetPassword2, ...password2 } = useField('password');

   const resetValues = () => {
      resetEmail();
      resetPassword();
      resetPassword2();
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      hideAlert();
      setLoading(true);

      const registerUser = {
         email: email.value,
         password: password.value,
         password2: password2.value,
      };
      try {
         const data = await authService.register(registerUser);

         showAlert({
            text: data.msg,
            type: 'success',
         });
         resetValues();
         setLoading(false);
      } catch (error: any) {
         console.log(error);

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
            <input {...email} placeholder='Email' id='email' />
         </label>
         <label htmlFor='password'>
            <span>
               <img src='/images/padlock.svg' alt='' />
            </span>
            <input {...password} placeholder='password' id='password' />
         </label>
         <label htmlFor='password2'>
            <span>
               <img src='/images/padlock.svg' alt='' />
            </span>
            <input
               {...password2}
               placeholder='Confirm Password'
               id='password2'
            />
         </label>
         <button type='submit' disabled={loading}>
            Register
         </button>
      </Form>
   );
};

export default RegisterForm;
