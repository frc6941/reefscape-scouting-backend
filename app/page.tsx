"use client";

import StepForm from "@/app/components/step-form";
import Step from "@/app/components/step";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/app/components/input";
import AllianceSelect from "@/app/components/alliance-select";
import Select from "@/app/components/select";
import Image from "next/image";

import reefSideView from "../public/reef-side-view.jpg";
import Counter from "@/app/components/counter";

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
      teamNumber: yup
        .number()
        .min(0, 'Team Number should not be less than 0.')
        .typeError('Team Number must be a number')
        .required('Team Number is required.'),
      alliance: yup.string().oneOf(["red", "blue"]).required('Alliance is required.'),
    }).required(),
    autoStart: yup.object({
      test: yup.string().required('Test is required.'),
    }).required(),
    autonomous: yup.object({
      coralCount: yup.object({
        l4: yup.number().default(0).min(0).required(),
        l3: yup.number().default(0).min(0).required(),
        l2: yup.number().default(0).min(0).required(),
        l1: yup.number().default(0).min(0).required(),
        dropOrMiss: yup.number().default(0).min(0).required(),
      }).required(),
      algaeCount: yup.object({
        netShot: yup.number().default(0).min(0).required(),
        processor: yup.number().default(0).min(0).required(),
        dropOrMiss: yup.number().default(0).min(0).required(),
      }).required()
    }).required(),
    teleop: yup.object({
      coralCount: yup.object({
        l4: yup.number().default(0).min(0).required(),
        l3: yup.number().default(0).min(0).required(),
        l2: yup.number().default(0).min(0).required(),
        l1: yup.number().default(0).min(0).required(),
        dropOrMiss: yup.number().default(0).min(0).required(),
      }).required(),
      algaeCount: yup.object({
        netShot: yup.number().default(0).min(0).required(),
        processor: yup.number().default(0).min(0).required(),
        dropOrMiss: yup.number().default(0).min(0).required(),
      }).required()
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
        <Input<FormData> className="w-64 mt-5" placeholder="Enter team number" label="Team Number" name="gameStart.teamNumber" error={errors.gameStart?.teamNumber?.message}/>
        <AllianceSelect<FormData> className="mt-5" name="gameStart.alliance" label="Alliance" error={errors.gameStart?.alliance?.message}></AllianceSelect>
      </Step>
      <Step<FormData> fields="autonomous" description="Autonomous">
        <div className="flex space-x-20 w-full">
          <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-2xl">Coral</h1>
            <div className="flex">
              <div className="flex flex-col font-bold text-xl mr-5">
                <div className="flex-1 flex justify-end items-center">
                  <p>Drop or Miss</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L4</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L3</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L2</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L1</p>
                </div>
              </div>
              <div className="relative">
                <Image width={300} className="h-auto rounded-md" src={reefSideView} alt=""/>
                <div className="absolute inset-0 flex flex-col w-full h-full">
                  <Counter<FormData> name="autonomous.coralCount.l4" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.coralCount.l3" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.coralCount.l2" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.coralCount.l1" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.coralCount.dropOrMiss" className="flex-1 bg-black bg-opacity-50"></Counter>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-2xl">Algae</h1>
            <div className="flex">
              <div className="flex flex-col font-bold text-xl mr-5">
                <div className="flex-1 flex justify-end items-center">
                  <p>Drop or Miss</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>Net Shot</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>Processor</p>
                </div>
              </div>
              <div className="relative">
                <Image width={300} className="h-auto rounded-md opacity-0" src={reefSideView} alt=""/>
                <div className="absolute inset-0 flex flex-col w-full h-full">
                  <Counter<FormData> name="autonomous.algaeCount.dropOrMiss" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.algaeCount.netShot" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.algaeCount.processor" className="flex-1 bg-black bg-opacity-50"></Counter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Step>
      <Step<FormData> fields="teleop" description="Teleop">
        <div className="flex space-x-20 w-full">
          <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-2xl">Coral</h1>
            <div className="flex">
              <div className="flex flex-col font-bold text-xl mr-5">
                <div className="flex-1 flex justify-end items-center">
                  <p>Drop or Miss</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L4</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L3</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L2</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>L1</p>
                </div>
              </div>
              <div className="relative">
                <Image width={300} className="h-auto rounded-md" src={reefSideView} alt=""/>
                <div className="absolute inset-0 flex flex-col w-full h-full">
                  <Counter<FormData> name="teleop.coralCount.l4" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="teleop.coralCount.l3" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="teleop.coralCount.l2" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="teleop.coralCount.l1" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="teleop.coralCount.dropOrMiss" className="flex-1 bg-black bg-opacity-50"></Counter>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-5">
            <h1 className="font-bold text-2xl">Algae</h1>
            <div className="flex">
              <div className="flex flex-col font-bold text-xl mr-5">
                <div className="flex-1 flex justify-end items-center">
                  <p>Drop or Miss</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>Net Shot</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <p>Processor</p>
                </div>
              </div>
              <div className="relative">
                <Image width={300} className="h-auto rounded-md opacity-0" src={reefSideView} alt=""/>
                <div className="absolute inset-0 flex flex-col w-full h-full">
                  <Counter<FormData> name="autonomous.algaeCount.dropOrMiss" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.algaeCount.netShot" className="flex-1 bg-black bg-opacity-50"></Counter>
                  <Counter<FormData> name="autonomous.algaeCount.processor" className="flex-1 bg-black bg-opacity-50"></Counter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Step>
      <Step<FormData> fields="autoStart" description="End & After Game">
        <Input<FormData> placeholder="Enter team number" label="Team Number" name="autoStart.test" error={errors.autoStart?.test?.message}/>
      </Step>
    </StepForm>
  );
}
