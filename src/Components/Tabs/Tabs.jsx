import React from 'react';
import Button from '../Button/Button'; // Import Button component

const Tabs = ({ size = 'small', tabs = [], activeTab, onTabClick, activeColor = 'bg-white', inactiveColor = '' }) => {
  return (
    <div className="font-sans flex  overflow-x-auto scrollbar-hidden py-1 px-[4%] rounded-lg bg-[#f5f5f5]">
      {tabs.map((tab, index) => (
        <Button
          key={index}
          color="text-black"
          onClick={() => onTabClick(tab)} // Handle tab click
          size={size} // Pass size prop to Button
          className={`${
            activeTab === tab
              ? `${activeColor} text-black` // Active tab style
              : `${inactiveColor} text-black` // Inactive tab style
          }  rounded-lg  mr-3 focus:outline-none font-bold tracking-wider`}
          text={tab} // Pass the tab name as text
        />
      ))}
    </div>
  );
};

export default Tabs;
