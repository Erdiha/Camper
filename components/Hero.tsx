import React, { useEffect, useState } from 'react';
import { allData, stateNames, stateAbbreviations, api } from '../data/data';
import { atom, useRecoilState } from 'recoil';
import { InputSearch, atomModal, heroPhotos } from '../recoil/atom';
import Cards from './Cards';
import { IData } from '../data/types';
import { DocumentData } from 'firebase/firestore';

import Carousel from './Carousel';
import UseAuth from '../data/authservice';
function Hero() {
  const [datas, setDatas] = useState<IData[] | DocumentData[]>([]);
  const [search, setSearch] = useRecoilState(InputSearch);
  const [searchDone,setSearchDone] =useState(false)
  const [hphotos,setHPhotos] =useRecoilState(heroPhotos)
   const { isLoading } = UseAuth();
  const photos:any=[]


  const handleClick = (e: any) => {
    
    let words: any | null | ' ';
    if (search) {
      words = search.split(' ');

      if (words) {
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const stateIndex = stateNames.indexOf(words.join(' '));
        const stateAbbr = stateAbbreviations[stateIndex];
        setSearch(stateAbbr);
      }
    }
      setSearchDone(true)
  };
  useEffect(()=>{
    let counter = 0;
  counter<8 &&  datas?.map((item:any)=>{
       item.images.map((image:any)=>{
      const t:any = image.url
       photos.push(t)
       counter++;
       })
      })
      setHPhotos(photos)
  },[datas])

  useEffect(() => {
    let url = `https://developer.nps.gov/api/v1/parks?api_key=${api}&stateCode=${search}&fields=images`;
    async function fetchMyAPI() {
      const allData1 = await fetch(url);
      const allData = await allData1.json();
      setDatas(allData.data)
    }
    fetchMyAPI();
  }, [search]);
   
  return (
    <div className="relative  bg-gradient-to-b
     from-slate-800  to-slate-300  flex  justify-center m-auto max-w-[90rem]
     flex-col items-center">
       
      <div  
      className={`w-full h-[40rem] md:h-[40rem]  min-h-full
      rounded-b  banner grid relative grid-cols-2  overflow-hidden
       justify-center items-center md:rounded-b  bg-gradient-to-b from-black to-slate-500
       bg-slate-400`}>
      { 
        hphotos?.map((item:any,index:number)=>{
          return <img key={index} className=' h-full w-full opacity-[0.3]
            bg-gradient-to-b from-black' src={item} alt="" />
        })
      }
       <div className='absolute  left-0 right-0 text-center'>
      
         <input
          name="state"
          required
          placeholder="eg. California"
          onChange={(e: any) =>setSearch(e.target.value)}
          className="bg-slate-200 w-[14rem] rounded-full 
          focus:bg-slate-100 md:w-[15rem] lg:w-[20rem] mr-6
          font-semibold text-xl text-center h-10"
          type="text"></input>
        <button
          onClick={handleClick}
          className="h-10 w-20 text-[20px] transition duration-300 ease-in-out
           hover:scale-105 text-slate-100 font-semibold border-b-4 border-white  rounded-md bg-slate-800">
          FIND
        </button>
       </div>
      </div>
    { isLoading ? <img src="/spinning1.gif"/>:
      <div className="w-full flex flex-col md:grid ld:grid
        md:grid-cols-2 mt-[-5rem] mb-10
        lg:grid-cols-3 p-2 gap-4 md:max-w-[58rem] lg:max-w-[90rem]  min-h-[40rem]">
        {datas?.map((item: any) => {
          return <Cards key={item.id} {...item} />;
        })}
      </div>}
    </div>
  );
}

export default Hero;
