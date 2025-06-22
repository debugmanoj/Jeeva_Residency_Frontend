// src/Layouts/Layout.jsx
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';  // Import the Navigation component
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';

const Layout = ({ children }) => {
   const { isLoading } = useSelector((state) => state.loader); // Access the loader state from Redux
  return (
    <div className="layout h-screen flex flex-col">
      {/* The Navigation bar will be at the top */}


      {/* The content of the page */}
      <div className="content flex-grow overflow-y-auto">
        {children}  {/* Dynamic content */}
      </div>
      <Navbar />
       {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-50 z-50 flex items-center justify-center">
          <div className="text-white text-xl"><Loader/></div>
        </div>
      )}
    </div>
  );
};

export default Layout;
