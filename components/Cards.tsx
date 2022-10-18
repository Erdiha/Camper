import React, { useState } from 'react';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { atomModal, modalPark } from '../recoil/atom';
import { IData } from '../data/types';

function Cards({ ...props }) {
  const [readMore, setReadMore] = useState(false);
  const [openModal, setOpenModal] = useRecoilState(atomModal);
  const [addModalPark, setAddModalPark]: any = useRecoilState<IData | null>(
    modalPark
  );
  return (
    <div
      className="flex justify-center my-3  
    transition ease-in-out duration-300">
      <div
        className="flex flex-col 
      
     md:flex-row md:max-w-3xl
       lg:max-w-[60rem] rounded-lg bg-white shadow-lg">
        <img
          className=" w-full h-96 md:h-auto object-cover md:w-52 
          rounded-lg  "
          src={`${props.images[0].url}`}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {props.fullName}
          </h5>

          <p className="text-gray-700  transition duration-300 ease-in-and-out  text-base mb-4">
            {!readMore
              ? props.description.substring(0, 200) + '...'
              : props.description}{' '}
            <span
              onClick={() => setReadMore((prev) => !prev)}
              className="text-slate-400 underline italic hover:text-slate-600 font-semibold cursor-pointer">
              {readMore === true ? 'Read Less' : 'Read More'}
            </span>
          </p>

          <p className="text-gray-600 text-xs">
            <a
              target="-blank"
              className="italic text-[15px] text-blue-400"
              href={props?.url}>
              Visit Website
            </a>
          </p>
          <button
            onClick={() => {
              setAddModalPark(props);
              setOpenModal((prev: boolean) => true);
            }}
            className="bg-orange-600 hidden md:flex 
            justify-center items-center rounded w-28 h-10
             text-white absolute bottom-5 right-10">
            View Details
          </button>
        </div>
      </div>
      {openModal && <Modal />}
    </div>
  );
}

export default Cards;
{
  /* <div key={item.id}>
            <p>{item.fullName}</p>

            <img
              src={`${item.images[0].url}`}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div> */
}
