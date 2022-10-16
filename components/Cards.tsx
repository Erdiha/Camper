import React, { useState } from 'react';
import Modal from '../components/modal';
function Cards({ ...props }) {
  const [readMore, setReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('Read More');
  return (
    <div className="flex justify-center m-2">
      <div className="flex flex-col md:flex-row md:max-w-3xl lg:max-w-[60rem] rounded-lg bg-white shadow-lg">
        <img
          className=" w-full h-96 md:h-auto object-cover md:w-52 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={`${props.images[0].url}`}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {props.fullName}
          </h5>

          <p className="text-gray-700 cursor-pointer transition duration-300 ease-in-and-out  text-base mb-4">
            {!readMore
              ? props.description.substring(0, 200) + '...'
              : props.description}{' '}
            <span
              onClick={() => setReadMore((prev) => !prev)}
              className="text-slate-400 underline italic hover:text-slate-600 font-semibold">
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
              setShowModal((prev: boolean) => !prev);
            }}
            className="bg-orange-600 rounded w-28 text-white absolute bottom-5 right-10">
            View Details
          </button>
        </div>
      </div>
      {showModal && <Modal />}
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
