import Social from '../Social/Social';
import { FormBoxFooterRoot } from './FormBoxFooter.styles';
import { Link } from 'react-router-dom';

interface FormBoxFooterProps {
   linkUrl: string;
   linkText: string;
   resetPassword: boolean;
}

const FormBoxFooter = ({
   linkUrl,
   linkText,
   resetPassword,
}: FormBoxFooterProps) => {
   return (
      <FormBoxFooterRoot>
         <div>
            <p>or continue with these social profiles</p>

            <Social />

            <p>
               Adready a member? <Link to={linkUrl}>{linkText}</Link>
            </p>
            {resetPassword && (
               <p>
                  Forgot your password?{' '}
                  <Link to='/forgot-password'>Reset Password</Link>
               </p>
            )}
         </div>
      </FormBoxFooterRoot>
   );
};

export default FormBoxFooter;
