import React, { ReactNode } from "react";
import {FieldPath, FieldValues} from "react-hook-form";

export interface StepProps<T extends FieldValues> {
  description: string;
  children?: ReactNode;
  fields: FieldPath<T>;
  className?: string;
}

const Step = <T extends FieldValues,>({ children, className }: StepProps<T>) => {
  return <div className={className}>{children}</div>;
};

export default Step;