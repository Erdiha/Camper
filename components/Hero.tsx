import React, { useEffect, useState } from 'react';
import { allData, stateNames, stateAbbreviations, api } from '../data/data';
import { atom, useRecoilState } from 'recoil';
import { InputSearch, atomModal } from '../recoil/atom';
import Cards from './Cards';

function Hero(props: any) {
  const [datas, setDatas]: any = useState();
  const [search, setSearch] = useRecoilState(InputSearch);
  const [activeModal, setActiveModal] = useState(false);
  const openModal = useRecoilState(atomModal);
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
    <div className="relative p-3 flex  flex-col items-center">
      <h1 className="text-2xl mb-5">Let&apos;s Find National Parks!</h1>
      <div className=" flex justify-center gap-2 mb-4 items-center w-full">
        <input
          name="state"
          placeholder="eg. California"
          onChange={()=>handleClick}
          className="bg-slate-300 w-[14rem] rounded-full 
          focus:bg-slate-100 md:w-[15rem] lg:w-[20rem]
          font-semibold text-xl text-center h-10"
          type="text"
        />
       
        <button
          onClick={handleClick}
          className="h-10 w-20 rounded-md bg-slate-400">
          find
        </button>
      </div>

      <div className="w-full  min-h-[30rem]">
        {datas?.map((item: any) => {
          return <Cards key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Hero;
