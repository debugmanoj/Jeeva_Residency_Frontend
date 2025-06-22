import React, { useState } from 'react';
import { FaHome, FaMoneyBillAlt } from 'react-icons/fa'; // Icons for Home and Expense
import { FiHome } from "react-icons/fi";
import { CiWallet } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate=useNavigate()
   const location = useLocation();  // Hook to get current location
   const [activeTab, setActiveTab] = useState((location.pathname === '/home'||location.pathname === '/viewAllAvailablerooms'||location.pathname === '/detailsPage'||location.pathname === '/bookConfirmation'||location.pathname === '/viewAllAvailablerooms'||location.pathname === '/detailsPage'||location.pathname === '/BookSummary') ? 'Home' : 'Expense'); 
  
  const tabs = [
    { name: 'Home', icon: <FiHome />,navigation:"/home" },  // Home with icon
    { name: 'Expense', icon: <CiWallet  />,navigation:"/expense" },  // Expense with icon
  ];

  const handleTabClick = (tab,navigationRoute) => {
    navigate(navigationRoute)
    setActiveTab(tab);  // Set the active tab
  };


  return (
    <div className=" font-sans fixed bottom-0 left-0 w-full bg-white p-[1%] rounded-t-lg  flex justify-evenly">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 cursor-pointer py-2 px-[16%] rounded-lg flex-col 
            ${activeTab === tab.name ? ' text-custom-red ' : 'bg-transparent text-gray-600'}`}
          onClick={() => handleTabClick(tab.name,tab.navigation)} 
        >
          <span className='ml-[5%]'>{tab.icon}</span>  {/* Tab icon */}
          <span className='text-xs p-[1%] mt-[2%]'>{tab.name}</span>  {/* Tab name */}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
