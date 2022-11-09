import useField from '../../hooks/useField';
import useLocalState from '../../hooks/useLocalState';
import useQuery from '../../hooks/useQuery';
import authService from '../../services/auth';
import { Form } from './Form.styles';

const ResetPasswordForm = () => {
   const { alert, showAlert, loading, setLoading } = useLocalState();
   const { reset: resetPassword, ...password } = useField('password');
   const query = useQuery();

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      try {
         const resetParams = {
            email: query.get('email'),
            token: query.get('token'),
            password: password.value,
         };

         const data = await authService.resetPassword(resetParams);

         showAlert({
            text: data.msg,
            type: 'success',
         });

         resetPassword();
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
         <label htmlFor='password'>
            <span>
               <img src='/images/padlock.svg' alt='' />
            </span>
            <input {...password} placeholder='New password' />
         </label>
         <button type='submit'>Confirm Password</button>
      </Form>
   );
};

export default ResetPasswordForm;
