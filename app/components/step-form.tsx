"use client";

import React, {FormEventHandler, ReactElement, ReactNode, useState} from "react";
import Step, {StepProps} from "@/app/components/step";
import {FieldValues, FormProvider, UseFormReturn} from "react-hook-form";

interface StepFormProps<T extends FieldValues> {
  className?: string | undefined;
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  children?: ReactNode;
  methods: UseFormReturn<T>
}

const StepForm = <T extends FieldValues,>({ children, onSubmit, className, methods }: StepFormProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.Children.toArray(children) as ReactElement<StepProps<T>, typeof Step>[];
  const { trigger } = methods;

  const handleNext = async () => {
    const isValid = await trigger(steps[currentStep].props.fields);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={className}>
        <div className="w-full flex gap-4">{
          steps.map((step, index) => (
            <StepVisual key={index} step={index} description={step.props.description} enable={index <= currentStep}/>
          ))
        }</div>
        <div className="mt-5">{(steps.map((step, index) => (index == currentStep && step)))}</div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentStep === steps.length - 1}
            onClick={() => handleNext()}
          >
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

interface StepVisualProps {
  step: number;
  description: string;
  enable: boolean
}

const StepVisual: React.FC<StepVisualProps> = ({ step, description, enable }) => {
  return (
    <div className="w-full space-y-4">
      {enable ? <div className="border-2 border-blue-500"/> : <div className="border-2"/>}
      <div>
        {enable ? (<p className="font-bold text-blue-500">Step {step + 1}</p>) : <p className="font-bold ">Step {step + 1}</p>}
        <p>{description}</p>
      </div>
    </div>
  );
};

StepVisual.displayName = "StepVisual";

export default StepForm;