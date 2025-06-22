import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  showPassword,
  toggleShowPassword,
  className,
  icon, // New prop to pass the icon to be used inside input
   min,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border border-gray-300 rounded-md text-sm px-4 py-3 w-full focus:outline-custom-red ${className} ${icon ? 'pl-10' : 'pl-4'}`} // Adjust padding based on icon
        min={min} // Apply the min attribute to the input field
        // className={`border border-gray-300 rounded-md text-sm px-4 py-3 w-full focus:outline-[#2ecc71] ${className}`}
        {...props}
      />
      {icon && (
        <div className="absolute left-3 top-[57%] transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
      {showPassword && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black underline text-xs"
          onClick={toggleShowPassword}
        >
          {type === 'password' ? 'Show' : 'Hide'}
        </button>
      )}
    </div>
  );
};

export default Input;
