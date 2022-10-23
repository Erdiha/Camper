import React from 'react';
import Cards from '../components/Cards';
import  Navbar  from '../components/Navbar';
import useAuth, { userLibrary }  from '../data/authservice';
import { IData } from '../data/types';
import { DocumentData } from 'firebase/firestore';


function Myplaces() {

  const { currentUser } = useAuth();
  const lib:IData[] | DocumentData[] = userLibrary(currentUser?.uid);

  console.log("library",lib)
  return (
    <div className="relative">
     <Navbar />
      <div>
        <div className=" w-full mx-5 mt-[10rem]">
          <h1>My Places</h1>
        </div>
        <div className="w-[90%] md:grid mx-5 grid-cols-3 gap-4 p-2  min-h-[20rem]">
          {lib?.map((item: any) => {
            return <Cards key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Myplaces;
