import { doc, setDoc,deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdAddCircle, MdFileDownloadDone } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import Modal from '../components/Modal';
import { IData } from '../data/types';
import { db } from '../firebaseAuth';
import { allLibraryItemsAtoms, atomModal, itemAddedOrRemoved, libraryItemAtom, modalPark } from '../recoil/atom';
import useAuth from '../data/authservice';



function Cards({ ...props }) {
  const [readMore, setReadMore] = useState(false);
  const [openModal, setOpenModal] = useRecoilState(atomModal);
  const [addModalPark, setAddModalPark]: any = useRecoilState(modalPark);
  const [libraryItem, setLibraryItem] = useRecoilState(libraryItemAtom);
  const [allLibrary, setAllLibrary] = useRecoilState(allLibraryItemsAtoms);
  const [added, setAdded] = useRecoilState(itemAddedOrRemoved);
  const { currentUser } = useAuth();
  const userID = currentUser!.uid;
  const addMoviesToLibrary = async () => {
  !added
    ? await setDoc(
        doc(db, 'users', userID, 'myLib', libraryItem?.id.toString()!),
        { ...libraryItem }
      )
    : await deleteDoc(
        doc(db, 'users', currentUser!.uid, 'myLib', libraryItem?.id.toString()!)
      );
};
  return (
    <div
      className="flex justify-center my-3 h-full
    transition ease-in-out duration-300">
      <div
        className="flex flex-col 
       h-full relative
      md:flex-col 
       lg:max-w-[60rem] rounded-lg bg-white shadow-lg">
        <img
          className=" w-full min-h-96 md:h-[20rem] object-cover
          rounded-lg  "
          src={`${props?.images[0]?.url}`}
          alt=""
        />
        <div className="p-6  flex flex-col justify-start ">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {props?.fullName}
          </h5>

          <p className="text-gray-700  transition duration-300 ease-in-and-out  text-base mb-4">
            {!readMore
              ? props.description?.substring(0, 200) + '...'
              : props?.description}{' '}
            <span
              onClick={() => setReadMore((prev) => !prev)}
              className="text-slate-400 underline italic hover:text-slate-600 font-semibold cursor-pointer">
              {readMore === true ? 'Read Less' : 'Read More'}
            </span>
          </p>

          <div className="w-full  mr-0 h-12 flex justify-end items-center ">
            <span className="cursor-pointer"
              onClick={() => {
                setLibraryItem(props)
                setAdded(true);
              }}>
              <MdAddCircle className=" w-[25px] h-[25px]" />
            </span>
            <span className="cursor-pointer ml-3"
              >
              <AiFillHeart className="  w-[25px] h-[25px] text-red-500" />
            </span>
            <button
              onClick={() => {
                setAddModalPark(props);
                setOpenModal(true);
              }}
              className="bg-orange-600 hidden md:flex 
            justify-center items-center rounded w-28 h-10 ml-3
             text-white  right-10">
              View Details
            </button>
          </div>
          <button
            className="text-gray-600
             text-sm   
           font-semibold absolute bottom-3 ">
            <a
              target="-blank"
              className="italic text-[15px] text-blue-400"
              href={props?.url}>
              Visit Website
            </a>
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
