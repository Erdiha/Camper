import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaTree } from 'react-icons/fa';
import useAuth from '../data/authservice';
import { navItemBackground } from '../recoil/atom';
import { useRecoilState } from 'recoil';
function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbackground,setNavBackground] =useRecoilState(navItemBackground)
  const [scrolling,setScrolling] = useState(false)
  let innerWidth: any = '';
  const { logout } = useAuth();
    //manipualting navbar scroll behaviour
  	useEffect(() => {
      const scrll = () => {
        window.scrollY > 0 ? setScrolling(true) : setScrolling(false);
      };
      window.addEventListener('scroll', scrll);
      return () => {
        window.removeEventListener('scroll', scrll);
      };
    }, []);
    //when window is resized navbar for mobile is added or removed
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
      className={` min-h-[100px] fixed-top min-w-full transition ease duration-300 
    items-center px-20 max-h-[100px]   z-1000  ${
      scrolling ? 'bg-black/60' : 'bg-black/80'
    }
      text-slate-200 flex  justify-between`}>
      <Link href="/">
        <span className="text-4xl md:ml-[4rem] font-semibold flex
         text-slate-50 h-[100px] items-center cursor-pointer">
          C<FaTree className="text-green-500 " />
          MPER
        </span>
      </Link>
      <ul
        id="navbar-ul"
        className={`justify-around  flex flex-col  transform left-[-50rem] top-[6.22rem] 
         z-[10]  ${scrolling ? 'bg-black/60' : 'bg-black/80'}
        items-center transition ease-in-out duration-1000 w-[100%] h-[30rem]
        text-2xl font-serif font-semibold ${showNavbar && 'bg-black/60'}
        md:flex-row  md:w-[65%] md:h-full   absolute md:mr-12
        md:top-[0.5rem]  md:left-0 md:relative md:bg-transparent
        md:text-2xl md:gap-2 ${showNavbar && 'navbar-mobile'}
      `}>
        <Link href="/">
          <li className={`navbar-items ${!navbackground && 'border-b-4 border-green-500'}`}>
            HOME
          </li>
        </Link>
        <Link href="/Myplaces">
          <li className={`navbar-items ${navbackground && 'border-b-4 border-green-500'}`}>
            MY PARKS
          </li>
        </Link>

        <li onClick={logout} className="navbar-items">
          LOG OUT
        </li>
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
