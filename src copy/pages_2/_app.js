import React from 'react';

import { Provider } from 'react-redux';

import Head from 'next/head';
import App from 'next/app';

import withFBQ from 'next-fbq';
import { Router } from '../../i18n';

import withReduxStore from 'utils/with-redux-store';
import { appWithTranslation } from 'utils/with-i18next';
import { UserProvider } from '../context/user';

import 'typeface-metropolis';
import '@typefaces-pack/typeface-inter';

class Srr extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Schola Live for Kids</title>
        </Head>

        <Provider store={reduxStore}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

// export default appWithTranslation(withReduxStore(Srr));
export default withFBQ('707491726826347', Router)(appWithTranslation(withReduxStore(Srr)));
