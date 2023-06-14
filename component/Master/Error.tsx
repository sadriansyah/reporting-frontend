import {ReactNode} from 'react';
import Head from 'next/head';
import Link from 'next/link';
interface ErrorProps {
  pageTitle:string,
  children:ReactNode
}

export default function ErrorPage(props:ErrorProps) {
  const {pageTitle, children} = props;
  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <div className="error-bg">
      </div>
      <div className="home-btn d-none d-sm-block">
        <Link href="/" className="text-white"><i className="fas fa-home h2" /></Link>
      </div>
      <div className="account-pages">
        {children}
      </div>
    </>
  )

}
