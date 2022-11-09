import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

interface UserProps {
   email: string;
   password: string;
   password2?: string;
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

const loginService = {
   register,
   login,
   verify,
   forgotPassword,
};

export default loginService;
