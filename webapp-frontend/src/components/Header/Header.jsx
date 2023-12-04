// Navbar.js
import React from 'react';

const Navbar = (props) => {
  return (
    <div className="bg-black p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className='pl-7'>
            <h2 className="text-2xl font-bold">Username</h2>
            <p className="text-sm">{props.email}</p>
          </div>
          <div className='text-3xl font-bold'>
            <h2>Admin Panel</h2>
          </div>
          <button
            className="bg-black text-white px-4 py-2 pr-7 font-bold rounded-md  focus:outline-none"
            onClick={() => props.getLoggedOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
