import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdAddCircle, MdFileDownloadDone } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import Modal from '../components/Modal';
import { IData } from '../data/types';
import { db } from '../firebaseAuth';
import { TiTick, TiPlus } from 'react-icons/ti';
import {
  allLibraryItemsAtoms,
  atomModal,
  itemAddedOrRemoved,
  libraryItemAtom,
  modalPark,
  textadd,
  
} from '../recoil/atom';
import useAuth from '../data/authservice';


function Cards(props:IData) {
  const [readMore, setReadMore] = useState(false);
  const { currentUser }:any = useAuth();
  const [openModal, setOpenModal] = useRecoilState(atomModal);
  const [modalpark, setModalPark] = useRecoilState(modalPark);
  const [added, setAdded] = useState(false);
  const [allLibrary, setAllLibrary] = useState<IData[] | DocumentData[]>([]);
   const [likes, setLikes] = useState<IData[] | DocumentData[]>([]);
  const [addOrDelete, setaddOrDelete] = useState('');
  const [textAdd, setTextAdd] = useRecoilState(textadd);
  const [liked,setLiked] = useState(false);

   //add or delete the item from library database
   const addMoviesToLibrary = async () => {
     const userID = currentUser!.uid;
    !added
       ? await setDoc(doc(db, 'campers', userID, 'myparks', props?.id.toString()!),{ ...props })
       : await deleteDoc(doc(db,'campers',currentUser!.uid,'myparks',props?.id.toString()!)); 
   };
   //add or delete the item from liked database
      const addLikes = async()=>{
        if(liked){
          await deleteDoc(doc(db,'campers',currentUser!.uid,'likes',props?.id.toString()!));
        }
        else{
          await setDoc(
          doc(db, 'campers', currentUser.uid, 'likes', props?.id.toString()!),
          { ...props })
        };}
  //retrieve liked items from database   
   useEffect(() => {
     if (currentUser) {
       return onSnapshot(
         collection(db, 'campers', currentUser.uid, 'myparks'),
         (snapshot) => setAllLibrary(snapshot.docs)
       );
     }
     
   }, [db,  props.id]);
//check if the item is in the database
    useEffect(() => {
     setAdded(allLibrary.findIndex((result: any) => (result.id === props?.id))!==-1);
   }, [allLibrary]);
//retrieve liked items from database
   useEffect(()=>{
    if (currentUser) {
      return onSnapshot(
        collection(db, 'campers', currentUser.uid, 'likes'),
        (snapshot) => setLikes(snapshot.docs)
      );
    }
   },[db,props.id])

//check if the item is already in the liked collection
 useEffect(() => {
  setLiked(likes.findIndex((result: any) => (result.id === props?.id))!==-1); 
 }, [likes]);

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

          <div className="w-full  mr-0 h-12 flex justify-end items-center transition duration-300 ease-in-out">
            <button
              onClick={addMoviesToLibrary}
              className="cursor-pointer 
            ">
              {!added ? <TiPlus   className="add-tick" /> : <TiTick    className="add-tick" />}
              {textAdd}
            </button>
            <p className="add-alert  text-slate-300">{addOrDelete}</p>
            <button
              onClick={addLikes}
              className="cursor-pointer ml-3
            ">
              {liked ? (
                <AiFillHeart className={` w-[25px] h-[25px] text-red-500`} />
              ) : (
                <AiOutlineHeart className={` w-[25px] h-[25px]`} />
              )}
            </button>
            <button
              onClick={() => {
                setModalPark(props);
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
