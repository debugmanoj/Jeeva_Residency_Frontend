import React, { useState } from 'react';

const Dropdown = ({ options, label, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative mb-4 font-sans">
      {/* Dropdown Label */}
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      
      {/* Dropdown Trigger */}
      <button
      type='button'
        onClick={toggleDropdown}
        className="w-full mt-2 py-2 px-4 border rounded-md text-sm bg-white text-left flex items-center justify-between  focus:ring-3 focus:outline-[#2ecc71]"
      >
        <span>{value || 'Select an option'}</span>
        <svg
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute w-full mt-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="py-2 px-1 cursor-pointer hover:bg-gray-100 hover:p-2 hover:rounded-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
    </div>
  );
};

export default Dropdown;
