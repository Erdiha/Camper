import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Head>
        <title>MyCamper</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* navbar and hero  */}
      <main className="z-[-1]">
        <Navbar />
        <Hero  />
      </main>
    </div>
  );
};
export default Home


