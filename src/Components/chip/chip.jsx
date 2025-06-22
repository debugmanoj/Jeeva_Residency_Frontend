import React from 'react';

const Chip = ({ label, onClick, style = {}, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`font-sans flex items-center justify-center py-[6%]   rounded-md bg-[#f5f5f5] text-black font-semibold text-xs cursor-pointer transition-all  ${className}`}
      style={style}
    >
      {label}
    </div>
  );
};

export default Chip;
