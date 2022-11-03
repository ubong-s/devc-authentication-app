import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

interface UserProps {
   email: string;
   password: string;
   password2?: string;
}

const register = async (credentials: UserProps) => {
   const response = await axios.post(`${baseUrl}/auth/register`, credentials);
   return response.data;
};

const login = async (credentials: UserProps) => {
   const response = await axios.post(`${baseUrl}/auth/login`, credentials);
   return response.data;
};

const loginService = {
   register,
   login,
};

export default loginService;
