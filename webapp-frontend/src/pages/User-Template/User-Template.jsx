// EditUserForm.js
import React, { useState, useEffect } from 'react';
import userService from '../../service/user.service';

export const EditUserForm = ({ userId, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    changePassword: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await userService.getOne(`/admin/get-user-detail/${userId}`);
        setFormData({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          changePassword: '',
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userService.updateUser(`/${userId}`, formData);
      onEdit(); // Trigger parent component to re-fetch the user list
      onClose(); // Close the edit form
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 w-96 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="changePassword" className="block text-sm font-medium text-gray-600">
              Change Password
            </label>
            <input
              type="password"
              id="changePassword"
              name="changePassword"
              value={formData.changePassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="text-[#83a300] font-medium px-4 py-2 rounded-md hover:bg-blue-600">
              Save
            </button>
            <button type="button" onClick={onClose} className="ml-2 text-red font-medium hover:underline focus:outline-none">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
