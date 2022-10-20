import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { allData, api, stateAbbreviations, stateNames } from '../data/data';
import { IData } from '../data/types';
import { atomModal, InputSearch } from '../recoil/atom';
import Cards from './Cards';

function Hero() {
  const [datas, setDatas] = useState<IData[] | DocumentData[]>([]);
  const [search, setSearch] = useRecoilState(InputSearch);
  const [activeModal, setActiveModal] = useState(false);
  const openModal = useRecoilState(atomModal);

  const pages = () => {
    const p = []
    for (let i = 0; i < 9; i++) { 
     p.push(<a key={i} className='flex-1 font-semibold  cursor-pointer justify-center flex items-center'>{i + 1}</a>)
    }
     return p
  }
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
  };

  useEffect(() => {
    let url = `https://developer.nps.gov/api/v1/parks?api_key=${api}&stateCode=${search}&fields=images`;
    async function fetchMyAPI() {
      const allData1 = await fetch(url);
      const allData = await allData1.json();
      setDatas(allData.data);
    }
    search && fetchMyAPI();
  }, [search]);
   console.log(datas, search);
  return (
    <div className="relative  flex  justify-center m-auto max-w-[90rem]
     flex-col items-center">
      <div className="w-full h-[40rem] md:h-[40rem] gap-4 
      rounded-b  
      flex justify-center items-center md:rounded-b 
       bg-slate-400">
        <input
          name="state"
          placeholder="eg. California"
          onChange={(e: any) => setSearch(e.target.value)}
          className="bg-slate-300 w-[14rem] rounded-full 
          focus:bg-slate-100 md:w-[15rem] lg:w-[20rem]
          font-semibold text-xl text-center h-10"
          type="text"></input>
        <button
          onClick={handleClick}
          className="h-10 w-20 text-slate-100  rounded-md bg-slate-600">
          find
        </button>
      </div>

      <div className="w-full flex flex-col md:grid ld:grid
        md:grid-cols-2 mt-[-5rem]
        lg:grid-cols-3 p-2 gap-4 md:max-w-[58rem] lg:max-w-[90rem]  min-h-[30rem]">
        {datas?.map((item: any) => {
          return <Cards key={item.id} {...item} />;
        })}
      </div>
      <div className='w-[20rem] absolute bottom-0 flex justify-between items-center h-10'>{ pages()}</div>
    </div>
  );
}

export default Hero;
