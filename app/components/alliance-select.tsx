import React from "react";
import {FieldPath, FieldValues, Path, PathValue, useController, useFormContext} from "react-hook-form";

interface AllianceSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  className?: string;
  error?: string | undefined;
}

const AllianceSelect = <T extends FieldValues,>({ name, label, className, error }: AllianceSelectProps<T>) => {
  const { control, setValue } = useFormContext<T>();
  const { field } = useController({ name, control });

  return (
    <div className={className}>
      <label className="font-bold" htmlFor={label}>{label}</label>
      <div className="flex gap-4 font-bold mt-1">
        <button
          type="button"
          className={`w-20 h-20 flex items-center justify-center rounded-lg border-2 transition ${
            field.value === "red" ? "border-red-700 bg-red-500 text-white" : "border-gray-800 bg-red-950"
          }`}
          onClick={() => setValue(name, "red" as unknown as PathValue<T, Path<T>>)}
          aria-label="Select Red Alliance"
        >
          Red
        </button>

        <button
          type="button"
          className={`w-20 h-20 flex items-center justify-center rounded-lg border-2 transition ${
            field.value === "blue" ? "border-blue-700 bg-blue-500 text-white" : "border-gray-800 bg-blue-950"
          }`}
          onClick={() => setValue(name, "blue" as unknown as PathValue<T, Path<T>>)}
          aria-label="Select Blue Alliance"
        >
          Blue
        </button>
      </div>
      {error && <p className="text-red-700 mt-2">{error}</p>}
    </div>
  )
}

export default AllianceSelect;