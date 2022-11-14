import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

const showMe = async () => {
   try {
      const response = await axios({
         method: 'GET',
         url: `${baseUrl}/user/showMe`,
         // url: `${baseUrl}/auth/google/authorized`,
         withCredentials: true,
      });

      return response.data;
   } catch (error) {
      console.log(error);
   }
};

const userService = {
   showMe,
};

export default userService;
