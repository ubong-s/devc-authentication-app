import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { useUserContext } from '../context/userContext';
import useLocalState from '../hooks/useLocalState';
import useQuery from '../hooks/useQuery';
import loginService from '../services/auth';
import { PageRootAlt } from './Pages.styles';

const VerifyEmail = () => {
   const query = useQuery();
   const {
      loading,
      setLoading,

      success,
      setSuccess,
   } = useLocalState();
   const [user, setUser] = useUserContext();

   const verifyToken = async () => {
      setLoading(true);
      try {
         const tokenParams = {
            email: query.get('email'),
            verificationToken: query.get('token'),
         };

         await loginService.verify(tokenParams);
         setSuccess(true);
      } catch (error: any) {}
      setLoading(false);
   };

   useEffect(() => {
      if (user.loading) {
         verifyToken();
      }
      // eslint-disable-next-line
   }, []);

   if (loading) {
      return (
         <PageRootAlt className='container'>
            <Loading />
         </PageRootAlt>
      );
   }

   if (!success) {
      return (
         <PageRootAlt className='container'>
            <h4>
               There was an error, please double check your verification link{' '}
            </h4>
         </PageRootAlt>
      );
   }

   return (
      <PageRootAlt className='container'>
         <h2>Account Confirmed</h2>
         <Link to='/login' className='btn'>
            Please login
         </Link>
      </PageRootAlt>
   );
};

export default VerifyEmail;
