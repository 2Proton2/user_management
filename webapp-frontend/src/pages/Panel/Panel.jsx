import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import UserList from '../UserList/UserList';
import userService from '../../service/user.service'

export const Panel = () => {
  const location = useLocation();
  const [userDetail, setUserDetail] = useState();
  const url = new URLSearchParams(location.search);
  const userId = url.get('id');

  async function fetchData(id){
    try {
      let result = await userService.getOne(`/admin/get-user-detail/${id}`)
      setUserDetail(result.data);
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
  return (
    <div>
      {(userDetail) ? <Header fName={userDetail.firstName} lName={userDetail.lastName} email={userDetail.email}/> : null}
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Link to="/admin/add-user" className="bg-red text-white px-4 py-2 rounded-md hover:bg-[#ff1744]">
            Add User
          </Link>
        </div>
        <UserList />
      </div>
    </div>
  );
};
