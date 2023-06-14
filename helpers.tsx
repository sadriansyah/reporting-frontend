import Document, {Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class CustomDocument extends Document {
  render(){
    return (
    <Html>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/metismenu.min.css" />
        <link rel="stylesheet" href="/assets/css/icons.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <Script strategy="lazyOnload" src="/assets/js/main.js"   />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )

  }
}
