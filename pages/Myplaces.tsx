import { DocumentData } from 'firebase/firestore';
import React from 'react';
import Cards from '../components/Cards';
import Navbar from '../components/Navbar';
import useAuth, { userLibrary } from '../data/authservice';
import { IData } from '../data/types';


function Myplaces() {

  const { currentUser } = useAuth();
  const lib:IData[] | DocumentData[] = userLibrary(currentUser?.uid);

  console.log("library",lib)
  return (
    <div
      className="absolute bg-gradient-to-b w-full md:p-5 pb-10
     from-black/70  to-slate-300 ">
      <Navbar />
      <div>
        <div className=" w-full md:w-[13rem] flex justify-center items-center mt-[10rem] text-white md:pl-8 lg:w-[15rem] ">
          <h1>My Places</h1>
        </div>
        <div className=" md:grid justify-center items-center flex flex-col grid-cols-2  md:grid-cols-2 lg:grid-cols-3 lg:px-8  gap-4 min-h-[20rem]">
          {lib?.map((item: any) => {
            return <Cards key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Myplaces;
