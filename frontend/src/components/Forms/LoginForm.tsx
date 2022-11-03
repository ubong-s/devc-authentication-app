import useField from '../../hooks/useField';
import { Form } from './Form.styles';

const LoginForm = () => {
   const { reset: resetEmail, ...email } = useField('text');
   const { reset: resetPassword, ...password } = useField('password');

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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

         <button type='submit'>Login</button>
      </Form>
   );
};

export default LoginForm;
