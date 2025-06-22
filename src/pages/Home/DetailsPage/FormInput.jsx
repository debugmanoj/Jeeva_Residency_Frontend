import React from 'react';
import Input from '../../../Components/Input/Input'; // Importing your custom Input component

const FormInput = ({ name, type, placeholder, value, onChange, onBlur, error, icon, className,min  }) => (
  <div className="mb-4">
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      icon={icon}  // Pass icon prop to Input component
      className={className}  // Pass any additional classes
      min={min} // Set the minDate prop to the input
    />
    {error && <div className="text-red-500 text-xs mt-2 ml-3">{error}</div>}
  </div>
);

export default FormInput;
