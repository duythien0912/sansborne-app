import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import 'antd/dist/antd.css';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href={require('assets/img/brand/favicon.ico')} />
          <link rel="apple-touch-icon" sizes="76x76" href={require('assets/img/brand/apple-icon.png')} />
          <link href="/static/styles.css" rel="stylesheet" />
        </Head>
        <script src="/static/instantpage-5.1.0.js" type="module" defer></script>
        <body className="text-gray-800 antialiased" style={{ background: '#f0f2f5' }}>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
