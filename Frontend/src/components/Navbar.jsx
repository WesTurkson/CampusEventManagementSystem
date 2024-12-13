import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
    
  FaBook,
  FaSave
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='bg-white text-black  px-4 md:px-6 py-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link to='/' className='flex items-center space-x-2'>
            <FaBook className='text-black h-8 md:h-11' />
            <h1 className='text-xl font-bold text-black'>Acity Event Book</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-6'>
          <Link
            to='/my-events'
            className={`flex items-center space-x-2 ${
              window.location.pathname === "/my-events"
                ? "text-black"
                : "ttext-black"
            } hover:text-gray-300`}
          >
            <FaSave />
            <span>My Events</span>
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/dashboard/create-event"
              className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Event
            </Link>
          )}

          <button
            onClick={handleLogout}
            className='bg-[#27272a] text-white px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-gray-600'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden mt-4 space-y-4'>
          <div className='flex flex-col space-y-4'>
            <Link
              to='/my-events'
              className='flex items-center space-x-2 px-4 py-2 text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              <FaSave />
              <span>My Events</span>
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/dashboard/create-event"
                className="text-black hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
            )}

            <button
              onClick={handleLogout}
              className='bg-[#000000] text-white px-4 py-2 rounded-lg text-center w-full'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
