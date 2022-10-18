import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { atomModal, modalPark } from '../recoil/atom';
import carousel from './carousel';

function ModalComp() {
  const [show, setShow] = useRecoilState(atomModal);
  const [modalpark, setModalPark] = useRecoilState(modalPark);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const len: number = modalpark?.activities?.length!;
  console.log(modalpark?.activities);

  return (
    <>
      {modalpark && (
        <Modal
          className="modal-lg "
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{modalpark.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row n overflow-hidden gap-2">
                {modalpark.images.map((item: any) => {
                  return (
                    <img
                      className="w-full h-96 md:h-auto object-cover 
                      md:hover:scale-[2] md:w-52 rounded-lg 
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
                <div className="border-4 p-2">
                  <b>Fees</b>
                  <br />
                  {modalpark.entranceFees?.map((item: any) => {
                    return (
                      <>
                        <i className="text-[12px]">{item?.title}</i>
                        {'-'}
                        <em className="font-semibold text-[12px] text-red-400">
                          {item.cost}$
                        </em>
                        <br />
                        <p className="text-[14px]">{item.description}</p>
                        <hr />
                      </>
                    );
                  })}
                </div>
                <br />
                <div className="border-4 p-2">
                  <b>Adresses</b> <br />
                  {modalpark.addresses?.map((address: any, index: number) => {
                    return (
                      <p>{`${address?.type},${address?.postalCode},
                    ${address?.city},
                     ${address?.stateCode},
                      ${address?.line1},
                        ${address?.line2},
                         ${address?.line3}
                    `}</p>
                    );
                  })}
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
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalComp;
