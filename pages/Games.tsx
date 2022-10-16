import React, { useState } from 'react';
import Navbar from '../components/Navbar';
interface ITypes {
  gridx: number;
  gridy: number;
  number: number;
}
function Games() {
  //const getBoxes = document.querySelector('#boxes-wrapper')!;
  //const createBoxes = document.createElement('span');
  const store: any = [];
  const colors = ['bg-slate-400', 'bg-slate-800'];
  const [types, setTypes] = useState<ITypes>();
  const handleClick = (type: string) => {
    if (type === 'grid') {
    } else {
    }
  };

  const createBox = () => {
    for (let i = 0; i < 100; i++) {
      store.push(
        <span
          className={`${
            i % 12 === 0 ? colors[0] : colors[1]
          } h-10 w-10 flex justify-center items-center`}>
          {i}
        </span>
      );
    }
    return store;
  };
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Games;
