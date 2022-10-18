import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import UseAuth, { Iinput } from '../data/authservice';

const Signin = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [demo, setDemo] = useState(false);
  const { logIn, Register } = UseAuth();
  //react hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();
  //when the user clicked button to login, do auth
  const onSubmit: SubmitHandler<Iinput> = async (data: any) => {
    console.log(data);
    if (demo) {
      data.email = 'demo@demo.com';
      data.password = '123456';
    }

    userLogin
      ? await logIn(data.email, data.password)
      : await Register(data.email, data.password);
  };

  console.log(demo);
  return (
    <div className="relative flex h-screen w-screen flex-col  items-center justify-center
     bg-[#849d84]">
      <Head>
        <title>MyCamper</title>
      </Head>

      <span className="icon ">
        MyCamper
        <p className='text-xl mt-3 italic font-thin '>Natiaol Parks In USA at Your Fingertips.</p>
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" relative flex h-[24rem] w-[16rem] flex-col px-4 md:p-0
                items-center justify-center space-y-[1rem] rounded-2xl 
                bg-black/40  md:h-[26rem] md:w-[22rem] lg:h-[32rem] lg:w-[26rem]">
        <h1 className="md:left-[2rem] left-6 absolute top-[14%] text-2xl font-bold  text-slate-200">
          Sign In
        </h1>
        <div className=" flex h-[50%] w-full flex-col  justify-around md:w-[90%]">
          <input
            {...register('email')}
            required
            className="input"
            type="email"
            placeholder="email"
          />
          <input
            {...register('password')}
            required
            className="input"
            type="password"
            placeholder="Your password"
          />
          <button
            onClick={() => setUserLogin(true)}
            className="md:hover:scale-120 h-[18%] w-[100%]
            hover:md:bg-slate-200
             rounded bg-slate-300 font-semibold"
            type="submit">
            Sign in
          </button>
          <span className="absolute bottom-5 m-auto mt-0 font-semibold text-slate-400 md:bottom-10 ">
            Register Today!{' '}
            <button
              type="submit"
              onClick={() => setUserLogin(false)}
              className="text-slate-300">
              Register
            </button>
          </span>
        </div>
      </form>
      <div className=" items center m-5 flex flex-col items-center justify-center gap-4 text-white">
        {' '}
        <p className="text-[20px]">or</p>
        <form action="" className="z-50" onSubmit={handleSubmit(onSubmit)}>
          <button
            type="submit"
            onClick={() => {
              setDemo(true);
              setUserLogin(true);
            }}
            className="  h-10 w-20 cursor-pointer rounded-md bg-black/60 font-semibold">
            Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
