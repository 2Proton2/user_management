// UserList.js
import React, { useEffect, useState, useCallback } from 'react';
import userService from '../../service/user.service';
import { useNavigate } from 'react-router-dom';
import {EditUserForm} from '../User-Template/User-Template';

const UserList = () => {
  const navigateTo = useNavigate();
  const [allUser, setAllUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleEdit = useCallback((userId) => {
    console.log('edit userId => ', userId);
    setEditingUserId(userId);
    // navigateTo(`/admin/panel/edit-user?id=${userId}`);
  }, []);

  const handleDelete = useCallback(async (userId) => {
    console.log(userId);
    await userService.deleteUser(`/admin/delete-user/${userId}`);
    fetchData();
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingUserId(null);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      let allUser = await userService.getAll(`/admin/get-all-users`);
      setAllUsers(allUser.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mt-8 flex justify-center">
      <div className="bg-white w-1/2 p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">User List</h2>
        {allUser.map((user) => (
          <div key={user.id} className="w-full bg-lightGray p-4 mb-4 flex justify-between items-center bg-gray-100 rounded-md">
            <div>
              <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-gray">{user.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user._id)}
                className="text-black font-bold hover:underline focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red font-bold hover:underline focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingUserId && (
          <EditUserForm
            userId={editingUserId}
            onClose={handleCancelEdit}
            onEdit={fetchData}
          />
        )}
    </div>
  );
};

export default UserList;
