import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import UserList from '../UserList/UserList';
import userService from '../../service/user.service'
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '../../store/slices/authSlice';
import { setUserType } from '../../store/slices/userSlice';
import { AddUserPopup } from './Popup';

export const Panel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();
  const [userDetail, setUserDetail] = useState();
  const url = new URLSearchParams(location.search);
  const userId = url.get('id');
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

  async function fetchData(id){
    try {
      let result = await userService.getOne(`/admin/get-user-detail/${id}`)
      setUserDetail(result.data);
      setShowAddUserPopup(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchDetails = async () => {
      await fetchData(userId);
    }
    fetchDetails();
  }, [userId])

  const handleAddUserClick = () => {
    setShowAddUserPopup(true);
  };

  const handleAddUserClose = () => {
    setShowAddUserPopup(false);
  };

  const handleLogout = async (userId) => {
    try {
      console.log('lloggoout');
      await userService.logout();
      navigateTo(`/`);
      dispatch(clearAuth());
      dispatch(setUserType(false));
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {(userDetail) ? <Header fName={userDetail.firstName} lName={userDetail.lastName} email={userDetail.email} getLoggedOut={handleLogout}/> : null}
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4 ml-7">
          <button to="/admin/add-user" onClick={handleAddUserClick} className="bg-red text-white font-bold px-4 py-2 rounded-md hover:bg-[#ff1744]">
            Add User
          </button>
        </div>
        <UserList />
      </div>
      {showAddUserPopup && <AddUserPopup onClose={handleAddUserClose} onAddUser={() => fetchData(userId)} />}
    </div>
  );
};
