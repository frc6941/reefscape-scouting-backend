import React, { useState, useRef, useEffect } from "react";
import {FieldPath, FieldValues, Path, PathValue, useController, useFormContext} from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  name: FieldPath<T>
  options: string[];
  label: string;
  className?: string;
  placeholder?: string;
  error?: string | undefined;
}

const Select = <T extends FieldValues,>({ name, options, placeholder, label, className, error }: SelectProps<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const { control, setValue } = useFormContext<T>();
  const { field } = useController({ name, control });
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <label className="font-bold" htmlFor={label}>{label}</label>
      <div onClick={() => setShowOptions(!showOptions)} className="cursor-pointer block w-full mt-1 rounded-md bg-black px-3 py-1.5 text-base text-white border-[1px] border-gray-800">
        <p>{field.value || placeholder}</p>
      </div>
      {error && <p className="text-red-700 mt-2">{error}</p>}
      { showOptions && (
        <ul className="absolute block mt-1 w-full rounded-md bg-black px-2 py-1 text-base text-white border-[1px] border-gray-800">
          {options.map((option) => (
            <li className={`rounded-md mt-1 hover:bg-gray-500 p-1 ${field.value === option ? "bg-gray-500" : ""}`} key={option} onClick={() => {
              setValue(name, option as unknown as PathValue<T, Path<T>>);
              setShowOptions(!showOptions);
            }}>
              {option}
            </li>
          ))}
        </ul>
      ) }
    </div>
  );
};

export default Select;