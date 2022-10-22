import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import useAuth from '../data/authservice';
import { IData } from '../data/types';
import { db } from '../firebaseAuth';
import {  atomModal, itemAddedOrRemoved, modalPark } from '../recoil/atom';


function ModalComp() {
  const [show, setShow] = useRecoilState(atomModal);
  const [modalpark, setModalPark] = useRecoilState(modalPark);
  const handleClose = () => setShow(false);
  const { currentUser } = useAuth();
 
  const [added, setAdded] = useRecoilState(itemAddedOrRemoved);
  const [allLibrary, setAllLibrary] = useState<IData[] | DocumentData[]>([]);

   const addMoviesToLibrary = async () => {
     const userID = currentUser!.uid;
    console.log("inside the add movies")
     !added ? await setDoc(doc(db, 'campers', userID, 'myparks', modalpark?.id.toString()!),{ ...modalpark })
     :await deleteDoc(doc(db,'campers',currentUser!.uid,'myparks',modalpark?.id.toString()!));
   };
 

  useEffect(() => {
    console.log("inside the snpshot")
    if (currentUser) {
      return onSnapshot(
        collection(db, 'campers', currentUser.uid, 'myparks'),
        (snapshot) => setAllLibrary(snapshot.docs)
      );
    }
  }, [db, modalpark?.id,added]);
  
  useEffect(() => {
    const found = allLibrary.some((result: any) => {
      return result.data().id === modalpark?.id;
    });
    setAdded(found);
  }, [allLibrary,added]);
  return (
    <>
      {modalpark && (
        <Modal
          className="modal-lg transition duration-500 ease-in-out "
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{modalpark.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between relative  overflow-hidden">
                {modalpark.images.map((item: any, index: number) => {
                  return (
                    index < 3 && (
                      <div key={item.id} className="flex  justify-between  ">
                        <p className="absolute overflow-hidden bottom-0 md:w-56   text-white rounded opacity-[0.8] bg-slate-600 p-1">
                          {item.title.substring(0, 25) + '...'}
                        </p>

                        <img
                          key={item.id}
                          className="w-full h-96 md:h-auto object-cover 
                      md:w-60 rounded-lg"
                          src={item.url}></img>
                      </div>
                    )
                  );
                })}
              </div>
              <hr />
              <div>
                <b  className=" flex mb-2 mt-0">Activities </b>
                
                <div className=" gap-2 items-center  flex flex-wrap">
                  
                  {modalpark?.activities?.map((item: any) => {
                    return <span key={item.id} className=' h-[1.3rem] p-2 flex 
                    justify-center items-center bg-slate-200 text-green-900 rounded '
                     >{item?.name}</span> ;
                  })}
                </div>
                <hr />
                <div className="border-4 px-2">
                  <span className="font-semibold">Fees</span>

                  {modalpark.entranceFees?.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <i className="text-[12px]">{item?.title}</i>
                        {'-'}
                        <em className="font-semibold m-0 text-[12px] text-red-400">
                          {item.cost}$
                        </em>
                        <hr />
                      </div>
                    );
                  })}
                </div>
                <br />
                <div className="border-4 flex flex-col items-start gap-2  p-2">
                  <span className="font-semibold ">
                    Adress:{' '}
                    <span className="text-[13px] ">{`
                   ${modalpark?.addresses[0]?.line1} ,
                    ${modalpark?.addresses[0]?.city},
                     ${modalpark?.addresses[0]?.stateCode},
                     ${modalpark?.addresses[0].postalCode}
                     
                    `}</span>{' '}
                  </span>
                  <span className="font-semibold ">
                    Phone:{' '}
                    <span className="text-[13px] ">{`
                   ${modalpark?.contacts.phoneNumbers[0]?.phoneNumber}
                   
                    `}</span>{' '}
                  </span>
                  <span className="font-semibold ">
                    Email:{' '}
                    <a
                      href={`mailto:${modalpark.contacts.emailAddresses[0]?.emailAddress}`}
                      className="text-[13px] ">{`
                   ${modalpark?.contacts.emailAddresses[0]?.emailAddress}
                   
                    `}</a>{' '}
                  </span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose;
                setModalPark(null);
              }}>
              Close
            </Button>
            <Button onClick={() => {
                addMoviesToLibrary()
            }} variant="primary">{`${added?'Remove Item':'Add to Library'}`}</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalComp;
