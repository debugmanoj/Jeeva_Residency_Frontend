import React from 'react';

// Reusable Button component with size handling and color support
const Button = ({ type = "button",  text, width, onClick, icon, forWardIcon, size = 'medium', className = '', color = 'bg-black text-white',disabled = false }) => {
  // Define different size classes
  const sizeClasses = {
    // small: 'text-xs py-2 px-2',
    small: 'text-xs py-[2%] px-[4.5%]',
    medium: 'text-xs py-[6%] px-[20%]',
    large: 'text-lg py-3 px-6',
  };
   // Disabled styling
  const disabledClasses = disabled
    ? ' cursor-not-allowed opacity-50'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-sans flex items-center ${color} rounded-lg  ${sizeClasses[size]} ${className} ${width} ${disabledClasses}`}
    >
      {/* Render the icon passed as a prop */}
      {icon && <span className="mr-1">{icon}</span>}
      <span className="flex-grow text-center">{text}</span>
      {/* {text} */}
      {/* <span className="flex-grow text-center">{text}</span> Ensures text is centered */}
      {forWardIcon && <span className="ml-1">{forWardIcon}</span>}
    </button>
  );
};

export default Button;
