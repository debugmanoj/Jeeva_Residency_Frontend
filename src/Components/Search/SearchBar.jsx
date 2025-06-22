import React from 'react';

const SearchBar = ({ value, onChange, placeholder,name  }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
         name={name} // Ensure the 'name' is passed here
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 px-7   text-[#595D62] focus:outline-none  bg-[#F5F5F5]  text-xs rounded-2xl"
      />
    </div>
  );
};

export default SearchBar;
