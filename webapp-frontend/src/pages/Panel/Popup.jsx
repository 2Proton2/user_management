import React, { useState } from 'react';
import {AddUser} from '../Add-User/Add-User';

export const AddUserPopup = ({ onClose, onAddUser }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray bg-opacity-75 flex items-center justify-center">
      <AddUser onClose={onClose} onAddUser={onAddUser} />
    </div>
  );
};
