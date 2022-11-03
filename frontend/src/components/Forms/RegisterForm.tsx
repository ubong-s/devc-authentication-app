import useField from '../../hooks/useField';
import { Form } from './Form.styles';

const RegisterForm = () => {
   const { reset: resetEmail, ...email } = useField('text');
   const { reset: resetPassword, ...password } = useField('password');
   const { reset: resetPassword2, ...password2 } = useField('password');

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
         <button type='submit'>Register</button>
      </Form>
   );
};

export default RegisterForm;
