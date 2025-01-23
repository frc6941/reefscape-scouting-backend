import {FieldPath, FieldValues, useController, useFormContext} from "react-hook-form";

interface CounterProps<T extends FieldValues> {
  name: FieldPath<T>;
  className?: string;
}

const Counter = <T extends FieldValues,>({ name, className }: CounterProps<T>) => {
  const { control, setValue } = useFormContext<T>();
  const { field } = useController({ name, control });

  return (
    <div className={`grid grid-cols-5 w-full ${className}`}>
      <button type="button" onClick={() => {
        if (field.value && field.value !== 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setValue(name, (field.value || 0) - 1)
        }
      }} className="col-span-1 hover:bg-black hover:bg-opacity-60 rounded-md text-2xl">-</button>
      <div className="col-span-3 flex justify-center items-center">
        <p className="text-2xl">{field.value || 0}</p>
      </div>
      <button type="button" onClick={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(name, (field.value || 0) + 1)
      }} className="col-span-1 hover:bg-black hover:bg-opacity-60 rounded-md text-2xl">+</button>
    </div>
  );
}

export default Counter;