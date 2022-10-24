import { DocumentData } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Cards from '../components/Cards';
import Navbar from '../components/Navbar';
import useAuth, { userLibrary } from '../data/authservice';
import { IData } from '../data/types';
import { navItemBackground } from '../recoil/atom';


function Myplaces() {
  //recoil atom to keep navbar item focused by adding bottom border
  const [navbackground, setNavBackground] = useRecoilState(navItemBackground);
  const { currentUser } = useAuth();
  const lib:IData[] | DocumentData[] = userLibrary(currentUser?.uid);
  //when page loads we set the hook true for myparks section
  useEffect(() => {
  setNavBackground(true)
  },[]);
 
  return (
    <div
      className="flex justify-center items-center bg-gradient-to-b w-full md:p-5 pb-10
     from-black/70  to-slate-300 ">
      <Navbar />
      <div>
        <div className=" w-full md:w-[13rem] flex justify-center items-center mt-[10rem] text-slate-300 md:pl-8 lg:w-[15rem] ">
          <h1>MY PARKS</h1>
        </div>
        <div className=" md:grid justify-center items-center max-w-[90rem]
         flex flex-col grid-cols-2  md:grid-cols-2 lg:grid-cols-3
          lg:px-8  gap-4 min-h-[20rem]">
          {lib?.map((item: any) => {
            return <Cards key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Myplaces;
