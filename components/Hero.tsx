import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useRecoilState } from 'recoil';
import { api, stateAbbreviations, stateNames } from '../data/data';
import { IData } from '../data/types';
import { InputSearch, navItemBackground } from '../recoil/atom';
import Cards from './Cards';


function Hero() {
  //states hooks
  const [allData, setAllData] = useState<IData[] | DocumentData[]>([]);
  const [activities,setActivities] = useState([])
  const [activity,setActivity]:any|null = useState([])
  const [search, setSearch] = useRecoilState(InputSearch);
  const [selectedOp,setSelectedOp] =useState("")
  const [navbackground, setNavBackground] = useRecoilState(navItemBackground);
  const [datas, setDatas] = useState<IData[] | DocumentData[]>([]);


  //handles search term by capitalizing first letter of each words
  const handleClick = () => {
    let words: any | null | ' ';
    if (search !=="" && search!==undefined) {
      words = search.split(' ');
      if (words) {
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const stateIndex = stateNames.indexOf(words.join(' '));
        const stateAbbr = stateAbbreviations[stateIndex];
        setSearch(stateAbbr);
      };
    }
    else{
      alert("Please Input Ihe State Name To Search")
    }
  };



//gets the activity names page loads
  useEffect(() => {
    setNavBackground(false)
    let url = `https://developer.nps.gov/api/v1/activities?api_key=${api}`;
    async function fetchMyAPI() {
      const allData1 = await fetch(url);
      const allData = await allData1.json();
      setActivities(allData.data)
    }
    fetchMyAPI();
  },[selectedOp])
  //set default activity as none and fetch all activitiy names  
  useEffect(() => {
    setActivity([{value:"None",label:"None"}])//stop accumulating same values every time ther eis rerendering
    activities.forEach((item: any) => {
     //set all the activities as an array for dropdown section
      setActivity((prev:any)=>[...prev,{value:item.name,label:item.name}])
    })
  },[activities])
  //upon serach fetch the state
  useEffect(() => {
     let url = `https://developer.nps.gov/api/v1/parks?api_key=${api}&stateCode=${search}&fields=images`;
    async function fetchMyAPI() {
      const allData1 = await fetch(url);
      const allData = await allData1.json();
      setAllData(allData.data)
      setDatas(allData.data)
      searchActivities()
      setSelectedOp('')
    }
   search !=="" && fetchMyAPI();
  }, [search]);

  //handles the downdown activity selection
  const handleOptionChange = (selectedOption: any) => {
    setSelectedOp(selectedOption.label)
    
   if (selectedOption.label !== 'None')
    { const res = allData.filter((item) =>
      item.activities.find((a: any) => a.name === selectedOption.label)
    );
      setDatas(res)
    }
   else if (selectedOption.label === undefined || selectedOption.label == "None") {
     setDatas(allData)
    }
   
  };
  //activity jsx function returns select with dropdown activities
  const searchActivities = () => {
    const options = activity;
   
    return (
      <Select
        placeholder="Select An Activity..."
        onChange={handleOptionChange}
        className="md:w-[30rem] w-[21rem] "
        isSearchable={false}
        options={options}
       
      />
    );
  };
  return (
    <div
      className="relative  bg-gradient-to-b transition-all duration-300 ease-in-out
       from-black/70  to-slate-300  flex  justify-center m-auto max-w-screen
     flex-col items-center">
      <div
        className={`w-full h-[40rem] md:h-[40rem]  md:max-w-[58rem] lg:max-w-[90rem]
      rounded-b  banner flex relative overflow-hidden bg-gradient-to-b from-black/80 to-transparent 
       justify-center items-center md:rounded-b 
      `}>
        <img
          className="imgContainer h-full w-full opacity-[1]
            bg-gradient-to-b from-black"
          src={datas[0]?.images[0]?.url}
          alt={datas[0]?.images[0]?.altText}
        />

        <div className="absolute left-0 right-0 top-[13rem] ms:top-[0rem] text-center">
          <div className="mb-8  ">
            <input
              name="state"
              required
              placeholder="Search States"
              onChange={(e: any) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
              className="bg-slate-200 w-[14rem] rounded-lg 
          md:w-[17rem] lg:w-[23rem] mr-6
          font-semibold md:text-xl text-center h-10 text-[16px]"
              type="text"></input>
            {search !== '' && search !== undefined && (
              <button
                onClick={handleClick}
                className="h-10 w-20 text-[20px] transition duration-300 ease-in-out
           hover:scale-105 text-slate-100 font-semibold border-b-4 border-white  rounded-md bg-slate-800">
                FIND
              </button>
            )}
          </div>
          <section className="flex justify-center  text-center">
            {searchActivities()}
          </section>

          {search !== '' && (
            <p
              className="text-white w-[14rem] rounded-lg  md:mt-[5rem]  mt-[3rem]

        md:w-[17rem] lg:w-[23rem] p-1 md:p-2 absolute md:left-5 left-8  bg-black/50
          font-semibold text-xl ">
              {datas.length !== 0
                ? datas.length === 1
                  ? selectedOp !== 'None'
                    ? `There Is One Parks with ${selectedOp} in ${search}`
                    : `There Is One Parks in ${selectedOp} `
                  : selectedOp !== 'None' && selectedOp !== ''
                  ? `There Are ${datas.length} Parks with  ${selectedOp} in ${search}`
                  : `There Are ${datas.length} Parks in ${search}`
                : `0 Result Found`}
            </p>
          )}
        </div>
      </div>
      {datas.length === 0 ? (
        <p className="text-xl text-red-600 md:text-2xl flex flex-row text-center word-wrap p-4">
          0 Results Found, Please Enter a State Name and Press the
          &quot;FIND&quot; Button,
        </p>
      ) : (
        <div
          className="w-full flex flex-col md:grid 
        md:grid-cols-2 md:mt-[-5rem] mb-10 mt-[-10rem]
        lg:grid-cols-3 p-2 gap-4 md:max-w-[58rem] lg:max-w-[90rem]  ">
          {datas?.map((item: any) => {
            return <Cards key={item.id} {...item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Hero;
