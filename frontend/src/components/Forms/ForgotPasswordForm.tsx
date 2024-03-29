import useField from '../../hooks/useField';
import useLocalState from '../../hooks/useLocalState';
import authService from '../../services/auth';
import { Form } from './Form.styles';

const ForgotPasswordForm = () => {
   const { alert, showAlert, loading, setLoading } = useLocalState();
   const { reset: resetEmail, ...email } = useField('text');

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      try {
         const data = await authService.forgotPassword(email.value);

         showAlert({
            text: data.msg,
            type: 'success',
         });

         resetEmail();
         setLoading(false);
      } catch (error: any) {
         showAlert({ text: error.response.data.msg });
         setLoading(false);
      }
   };

   if (alert.text) {
      return <div className={`alert ${alert.type}`}>{alert.text}</div>;
   }

   return (
      <Form onSubmit={handleSubmit}>
         <label htmlFor='email'>
            <span>
               <img src='/images/envelope.svg' alt='' />
            </span>
            <input {...email} placeholder='Email' />
         </label>
         <button type='submit'>Send Reset Link</button>
      </Form>
   );
};

export default ForgotPasswordForm;
