import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { url, api } from '../data/data';
import { IPark } from '../data/types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { InputSearch } from '../recoil/atom';

export default function Home() {
  const [datas, setDatas]: any = useState();
  const api = process.env.NEXT_PUBLIC_API_KEY;
  const stateName = useRecoilState(InputSearch);


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="z-[-1]">
        <Navbar />
        <Hero props={datas} />
      </main>

      <footer></footer>
    </div>
  );
}
