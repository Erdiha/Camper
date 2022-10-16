import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Createpdf from './Createpdf';
import { url, api } from '../data/data';
import { IPark } from '../data/types';
import { useEffect, useState } from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import { useRecoilState } from 'recoil';
import { InputSearch } from '../recoil/atom';

export default function Home() {
  const [datas, setDatas]: any = useState();
  const api = process.env.NEXT_PUBLIC_API_KEY;
  const stateName = useRecoilState(InputSearch);
  // let url = `https://developer.nps.gov/api/v1/parks?api_key=${api}&stateCode=${stateName}&fields=images`;
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const allData1 = await fetch(url);
  //     const allData = await allData1.json();
  //     setDatas(allData.data);
  //   }
  //   fetchMyAPI();
  // }, [url]);

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
