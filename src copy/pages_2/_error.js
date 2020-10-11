import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'utils/with-i18next';
import { Global, css } from '@emotion/core';

import Svg404 from '../containers/404';

export class ErrorPage extends React.PureComponent {
  render() {
    return (
      <>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
            }
            body {
              background-color: #fff;
              color: #000;
              font-size: 1.4em;
              line-height: 1.5;
            }
            .center_div {
              display: flex;
              flex-direction: column;
              height: 100%;
              align-items: center;
              justify-content: center;
            }
            .centered {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .emoji {
              font-size: 9em;
              text-align: center;
            }
            .title {
              font-size: 3em;
              text-align: center;
              line-height: 0em;
              color: grey;
            }
            .text {
              text-align: center;
            }
          `}
        />

        <Svg404 />
      </>
    );
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
};

ErrorPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(ErrorPage);
