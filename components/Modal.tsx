import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { atomModal, modalPark } from '../recoil/atom';
import Carousel from './Carousel';


function ModalComp() {
  const [show, setShow] = useRecoilState(atomModal);
  const [modalpark, setModalPark] = useRecoilState(modalPark);
  const [iamges,setImages] = useState([])
  const handleClose = () => setShow(false);




  useEffect(() => {
  },[modalpark])
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
              <div className="flex flex-row justify-between  overflow-hidden ">
                {modalpark.images.map((item: any,index:number) => {
                  return (
                   index<3 && <img
                      
                      key={item.id }
                      className="w-full h-96 md:h-auto object-cover 
                      md:w-60 rounded-lg 
                      "
                      src={item.url}></img>
                  );
                })}
              </div>
              <div>
                <div className=" gap-2 m-1">
                  <b>Activities: </b>
                  {modalpark?.activities.map((item: any, index: number) => {
                    return item?.name + ', ';
                  })}
                </div>
                <hr />
                <div className="border-4 px-2">
                  <span className='font-semibold'>Fees</span>
                  
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
                <div className="border-4 p-2">
                  <span className="font-semibold">Adresses</span> 
                  <p className='text-[12px]'>{`
                   ${modalpark?.addresses[0]?.line1} ,
                    ${modalpark?.addresses[0]?.city},
                     ${modalpark?.addresses[0]?.stateCode},
                     ${modalpark?.addresses[0].postalCode}
                     
                    `}</p>
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
            <Button variant="primary">Add to Library</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalComp;
