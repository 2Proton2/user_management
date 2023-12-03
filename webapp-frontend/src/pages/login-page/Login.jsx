import React, {useState} from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import userService from "../../service/user.service";
import { toast } from 'react-toastify';
import Notification from '../../components/Notification/Notification';

export const Login = () => {
  const NavigateTo = useNavigate();
  const location = useLocation();
  const params =  new URLSearchParams(location.search);
  const role = params.get('role');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if(role==='Admin'){
        let result = await userService.login('admin', { email, password });
  
        if(result.response === 200){
          Notification(toast, 'success', 'POSITION', 'BOTTOM_RIGHT', "Logged in successfully");
          Notification(toast, 'info', 'POSITION', 'BOTTOM_RIGHT', "Welcome Admin");
          NavigateTo(`/panel`);
        }
      }
      else if(role==='User'){
        let result = await userService.login('user', { email, password });
  
        if(result.response === 200){
          Notification(toast, 'success', 'POSITION', 'BOTTOM_RIGHT', "Logged in successfully");
          NavigateTo('/welcome')
        }
      }
    } catch (error) {
      Notification(toast, 'error', 'POSITION', 'BOTTOM_RIGHT', "Invalid Credentials");
      console.log(error)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-4 font-bold">{role} Login Page</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-300 px-4 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-300 px-4 py-2 rounded-md"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Login
      </button>
    </div>
  )
}
