import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
}

const Input = ({ 
  label, 
  id, 
  type, 
  register, 
  name,
  errorMessage,
  disabled 
}: InputFieldProps) => {
  return (
    <div className='flex flex-col space-y-1.5'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        {...register(name)}
        className="border border-gray-400 w-[350px] h-[35px]"
        disabled={disabled}
      />
      {errorMessage && <p className="text-kick text-sm">{errorMessage}</p>}
    </div>
  );
};

export default Input;