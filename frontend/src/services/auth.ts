import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

interface UserLogoutProps {
   id: string;
   email: string;
   name?: string;
   role: string;
   photo?: string;
}
interface UserProps {
   email: string;
   password: string;
   password2?: string;
}

interface ResetPasswordProps {
   email: string | null;
   token: string | null;
   password: string;
}

interface VerificationProps {
   email: string | null;
   verificationToken: string | null;
}

const register = async (credentials: UserProps) => {
   const response = await axios.post(`${baseUrl}/auth/register`, credentials);
   return response.data;
};

const login = async (credentials: UserProps) => {
   const response = await axios({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      data: credentials,
      withCredentials: true,
   });

   return response.data;
};

const logout = async (credentials: UserLogoutProps) => {
   const response = await axios({
      method: 'DELETE',
      url: `${baseUrl}/auth/logout`,
      data: credentials,
      withCredentials: true,
   });

   return response.data;
};

const verify = async (credentials: VerificationProps) => {
   const response = await axios.post(
      `${baseUrl}/auth/verify-email`,
      credentials
   );
   return response.data;
};

const forgotPassword = async (email: string) => {
   const response = await axios.post(`${baseUrl}/auth/forgot-password`, {
      email,
   });
   return response.data;
};

const resetPassword = async (credentials: ResetPasswordProps) => {
   const response = await axios.post(`${baseUrl}/auth/reset-password`, {
      credentials,
   });
   return response.data;
};

const loginWithGoogle = async () => {
   window.open(`${baseUrl}/auth/google`, '_self');
};

const authService = {
   register,
   login,
   logout,
   verify,
   forgotPassword,
   resetPassword,
   loginWithGoogle,
};

export default authService;
