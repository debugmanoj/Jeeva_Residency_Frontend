// src/Components/Loader/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-evenly items-center h-screen">
      <div className="w-10 h-10 border-4 border-transparent border-t-4 border-t-red-500 rounded-full animate-spin delay-0"></div>
    </div>
  );
};

export default Loader;
