"use client";

import StepForm from "@/app/components/step-form";
import Step from "@/app/components/step";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/app/components/input";
import AllianceSelect from "@/app/components/alliance-select";
import Select from "@/app/components/select";

const matchTypes = ["Practice", "Qualification", "Match", "Final"];

const schema = yup
  .object({
    gameStart: yup.object({
      matchType: yup.string().oneOf(matchTypes).required('Match Type is required'),
      matchNumber: yup
        .number()
        .min(0, 'Match Number should not be less than 0.')
        .typeError('Match Number must be a number')
        .required('Match Number is required.'),
      alliance: yup.string().oneOf(["red", "blue"]).required('Alliance is required.'),
    }).required(),
    autoStart: yup.object({
      test: yup.string().required('Test is required.'),
    })
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Home() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <StepForm className="mt-20 mx-52" methods={methods}>
      <Step<FormData> fields="gameStart" description="Game Start">
        <div className="flex gap-5">
          <Select<FormData> className="w-64" label="Match Type" placeholder="Select match type" name="gameStart.matchType" options={matchTypes} error={errors.gameStart?.matchType?.message}></Select>
          <Input<FormData> className="w-64" placeholder="Enter match number" label="Match Number" name="gameStart.matchNumber" error={errors.gameStart?.matchNumber?.message}/>
        </div>
        <Input<FormData> className="w-64 mt-5" placeholder="Enter team number" label="Team Number" name="gameStart.matchNumber" error={errors.gameStart?.matchNumber?.message}/>
        <AllianceSelect<FormData> className="mt-5" name="gameStart.alliance" label="Alliance" error={errors.gameStart?.alliance?.message}></AllianceSelect>
      </Step>
      <Step<FormData> fields="autoStart" description="Auto Start">
        <Input<FormData> placeholder="Enter team number" label="Team Number" name="autoStart.test" error={errors.autoStart?.test?.message}/>
      </Step>
      <Step<FormData> fields="autoStart" description="Auto Start">
        <Input<FormData> placeholder="Enter team number" label="Team Number" name="autoStart.test" error={errors.autoStart?.test?.message}/>
      </Step>
      <Step<FormData> fields="autoStart" description="Auto Start">
        <Input<FormData> placeholder="Enter team number" label="Team Number" name="autoStart.test" error={errors.autoStart?.test?.message}/>
      </Step>
    </StepForm>
  );
}
