import TopBar from '../navigation/TopBar';
import LeftSideBar from '../navigation/LeftBar';
import Footer from '../navigation/Footer';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import Script from 'next/script';
import loadjs from 'loadjs';


interface DashboardProps {
  pageTitle : string,
  children : ReactNode;
}

export default function Dashboard(props: DashboardProps) {

  useEffect(()=> {
    loadjs(["/assets/js/main.js","/assets/js/alertify.js"], berhasil);
    
  },[])

  const berhasil = () => {

  }

  const {pageTitle, children} = props;

    return (
        <>
        <Head>
          <title>
            {pageTitle}
          </title>

          <link rel="icon" href="/logo-thinkmatch.png" />
        </Head>
        <div id="wrapper">
          <TopBar />
          <LeftSideBar />
          <div className="content-page">
              {children}
            <Footer />
          </div>
        </div>
      </>
    )



}
