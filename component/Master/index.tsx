import {ReactNode} from 'react';
import Head from 'next/head';

interface MasterProps{
  children:ReactNode;
  pageTitle:string;
}

export default function Master(props: MasterProps) {
  const {children, pageTitle} = props;
  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <div>
      {children}
      </div>
    </>
  )
}
