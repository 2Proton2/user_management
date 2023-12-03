import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-8 font-bold">Welcome to the Login Page</h1>
      <div>
        <Link to="/login?role=Admin">
          <button className="bg-black text-white px-4 py-2 rounded-md mr-4">
            Admin login
          </button>
        </Link>
        <Link to="/login?role=User">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            User Login
          </button>
        </Link>
      </div>
    </div>
  )
}
