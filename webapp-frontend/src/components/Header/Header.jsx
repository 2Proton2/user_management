// Navbar.js
import React from 'react';

const Navbar = (props) => {
  console.log(props);

  return (
    <div className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-black">{props.fName} {props.lName}</h2>
          <p>{props.email}</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray" onClick={() => props.getLoggedOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
