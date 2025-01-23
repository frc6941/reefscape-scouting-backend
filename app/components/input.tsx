import React from "react";
import {FieldPath, FieldValues, useFormContext} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  placeholder?: string;
  name: FieldPath<T>;
  className?: string;
  error?: string | undefined;
}

const Input = <T extends FieldValues,>({ label, error, name, placeholder, className }: InputProps<T>) => {
  const { register } = useFormContext();
  return (
    <div className={className}>
      <label className="font-bold" htmlFor={label}>{label}</label>
      <input
        id={label}
        className="block w-full mt-1 rounded-md bg-black px-3 py-1.5 text-base text-white border-[1px] border-gray-800 placeholder:text-gray-400 focus:outline focus:outline-1 focus:outline-white"
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-700 mt-2">{error}</p>}
    </div>
  );
};

export default Input;