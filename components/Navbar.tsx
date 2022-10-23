import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useAuth from '../data/authservice';
function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  let innerWidth: any = '';
  const {logout}= useAuth()
  useEffect(() => {
    const getUl = document.getElementById('#navbar-ul')! as HTMLUListElement;
    if (typeof window !== 'undefined') {
      innerWidth = window.innerWidth;
    }
    if (getUl) {
    }
    window.addEventListener('resize', () => {
      innerWidth > 768 && setShowNavbar(false);
    });
  }, [showNavbar, innerWidth]);

  return (
    <div
      className=" min-h-[100px] fixed-top min-w-full
    items-center p-14 max-h-[100px]   z-1000
     bg-slate-800  text-slate-200 flex  justify-between">
      <span className="text-3xl">ICON</span>
      <ul
        id="navbar-ul"
        className={`justify-around  flex flex-col  transform left-[-50rem] top-[7rem]  z-[10]
        items-center transition ease-in-out duration-1000 w-[100%] h-[30rem] bg-gray-800 text-2xl
        md:flex-row  md:w-[65%] md:h-[100px]   absolute
        md:top-[0rem]  md:left-0 md:relative md:bg-transparent
        md:text-2xl md:gap-2 ${showNavbar && 'navbar-mobile'}
      `}>
        <Link href="/">
          <li className="navbar-items">HOME</li>
        </Link>
        <Link href="/Myplaces">
          <li className="navbar-items"> PARKS</li>
        </Link>
        
          <li onClick={logout} className="navbar-items">LOG OUT</li>
       
      </ul>
      <div
        onClick={() => {
          setShowNavbar((prev) => !prev);
        }}
        className={` flex flex-col gap-1 justify-center rounded-full
        w-[3rem] h-[2rem] bg-slate-400   items-center 
        md:hidden  cursor-pointer absolute right-10 z-[100]
      `}>
        <span className={`burger ${showNavbar && 'burger-active'}`}></span>
        <span className={`burger ${showNavbar && 'hidden'}`}></span>
        <span className={`burger ${showNavbar && 'burger-active'}`}></span>
      </div>
    </div>
  );
}

export default Navbar;
