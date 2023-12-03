// AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../service/user.service';
import { toast } from 'react-toastify';
import Notification from '../../components/Notification/Notification';

export const AddUser = () => {
    const navigateTo = useNavigate();

    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  
    const handleInputChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleAddUser = async (e) => {
      e.preventDefault();
      try {
        let result = await userService.addUser('/admin/add-user', userData)

        if(result.response){
            Notification(toast, 'success', 'POSITION', 'BOTTOM_RIGHT', "User Registered Successfully");
        }

        navigateTo('/admin/panel');
      } catch (error) {
        Notification(toast, 'error', 'POSITION', 'BOTTOM_RIGHT', 'Bad Request');
        console.error('Error adding user:', error);
      }
    };
  
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Add User</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="button"
            onClick={handleAddUser}
            className="bg-black hover:bg-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add User
          </button>
        </form>
      </div>
    );
};
