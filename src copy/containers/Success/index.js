import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import SelectLanguages from 'components/Header/SelectLanguages';
// import Link from 'next/link';
import { Link } from '../../../i18n';

// import { useRouter } from 'next/router';
import { Router } from '../../../i18n';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const AWhite = styled('a')`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const LogoImage = styled('img')`
  height: 70px;
  cursor: pointer;
`;

const SuccessDiv = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ShareButton = styled('button')`
  cursor: pointer;
  background: #5a5bd3;
  text-align: center;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 16px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 10px;
  margin-bottom: 80px;
`;

const SuccessBackground = styled('div')`
  background-image: linear-gradient(135deg, #4aaddf, #4abddf);
  padding: 0px;
  overflow: auto;
  height: 100vh;
`;

const MainInfoContainer = styled('div')`
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
`;

const ImgSuccess = styled('img')`
  animation: ${bounce} 1.5s ease;
`;

export function Success({ t }) {
  return (
    <>
      <div>
        <SuccessBackground>
          <MainInfoContainer>
            <div className="nameContainer">
              {/* <div className="name">{t('name')}</div> */}
              <Link href="/">
                <LogoImage src="/static/images/logo.png" />
              </Link>
              {/* <AWhite href="https://schola.tv/app">
                <div className="loginButton">{t('login_action')}</div>
              </AWhite> */}
            </div>

            <SuccessDiv>
              <div className="emoji">
                <ImgSuccess src="/static/images/tada.svg" width={250} />
              </div>
              <br></br>
              <br></br>
              <p className="title">Success!</p>
              <p className="text">
                Yay! You're all set. We sent an email to asdas@asds.asdasd with more info. Please share Zip with your
                friends on Facebook it'll help us a lot. See you on Thursday, September 10, 2:00 AM GMT+7
              </p>
              <Link href="/">
                <ShareButton type="button">Share with friend</ShareButton>
              </Link>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </SuccessDiv>
          </MainInfoContainer>
        </SuccessBackground>
      </div>
    </>
  );
}

Success.propTypes = {
  t: PropTypes.func,
};

export default Success;
