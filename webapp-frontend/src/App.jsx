import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {Login} from "./pages/login-page/Login";
import {Panel} from "./pages/Panel/Panel";
import {Welcome} from "./pages/Welcome/Welcome";
import {AddUser} from "./pages/Add-User/Add-User"
import {ErrorPage} from "./pages/Error/Error";
import { useSelector } from 'react-redux';

function App() {
  const isAdmin = useSelector((state) => {
    return state.user;
  })

  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index={true} element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<Welcome />} />
          {
            (isAdmin) ? <Route path="/admin/panel/add-user" element={<AddUser />} /> : null
          }
          {
            (isAdmin) ? <Route path='/admin/panel' element={<Panel />} /> : null
          }
          <Route path='*' element={<ErrorPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
