import styled from '@emotion/styled';
import SelectLanguages from 'components/Header/SelectLanguages';
import { useObserver } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { memo, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import { i18n } from 'utils/with-i18next';
// import Link from 'next/link';
import { Link, Router } from '../../../i18n';
import { userContext } from '../../context/user';
import { FetchData } from '../../lib/api';
import { gtagEvent } from '../../lib/gtag';
import { getShowcases } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectShowcases } from './selectors';

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

const list_topic = [
  {
    image: {
      src: 'https://schola.tv/wp-content/uploads/2020/09/jCv9yNx.gif',
    },
    title: 'Art 🎨',
    subtitle: 'Have your child make some art with the guidance of a professional artist!',
    action: 'Book Now',
  },
  {
    image: {
      src:
        'https://media2.giphy.com/media/yOxRIWzT9JZJu/giphy.gif?cid=ecf05e4750c40e18b9f2fafdb253b01e9975077e48c24188&rid=giphy.gif',
    },
    title: 'Space 🚀',
    subtitle: 'Have your child learn about how astronauts live in space!',
    action: 'Book Now',
  },
  {
    image: {
      src: 'https://schola.tv/wp-content/uploads/2020/09/ezgif.com-optimize.gif',
    },
    title: 'Culture and Travel 🇺🇳',
    subtitle: 'Have your child learn more about Culture and Travel!',
    action: 'Book Now',
  },
  {
    image: {
      src:
        'https://media2.giphy.com/media/vrKUtJNMtB3Y4/giphy.gif?cid=ecf05e4701bc25301bd6c3e574599853c6a432a33a61a127&rid=giphy.gif',
    },
    title: 'Dinosaurs 🦕',
    subtitle: 'Have your child learn more about the dinosaurs!',
    action: 'Book Now',
  },
  {
    image: {
      src: 'https://media1.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
    },
    title: 'Technology, Coding and Games 👩‍💻',
    subtitle: 'Have your child learn more about Technology, Coding and Games!',
    action: 'Book Now',
  },
];

export function Home({ getShowcases, showcasesData, t }) {
  useInjectSaga({ key: 'showcases', saga });
  useInjectReducer({ key: 'showcases', reducer });
  // const router = useRouter();

  // const [email, setEmail] = useState('');

  // const onClickStartButton = () => {
  //   Router.push({
  //     pathname: '/register',
  //     query: { email: email },
  //   });
  // };

  const store = useContext(userContext);
  const onClickStartButton = () => {
    gtagEvent({
      action: 'submit_home_form',
      category: 'Start',
      label: store.email,
      value: store.getData(),
    });

    Router.push({
      pathname: '/register',
      query: { email: store.email },
    });
  };

  const [select, setSelect] = useState(i18n.language);

  useEffect(() => {
    async function fetchData() {
      var topics = await FetchData(`/lg/tags/super?lang=${select}`);
      store.setHomeTopic(topics);
    }
    fetchData();
  }, [store, select]);

  return useObserver(() => (
    <>
      <div>
        <div className="purpleBackground">
          <div className="mainInfoContainer">
            <div className="nameContainer">
              {/* <div className="name">{t('name')}</div> */}
              <Link href="/">
                <LogoImage src="/static/images/logo.png" />
              </Link>
              {/* <AWhite href="https://schola.tv/app">
                <div className="loginButton">{t('login_action')}</div>

              </AWhite> */}
              <SelectLanguages />
            </div>
            <div className="oneLinerText">{t('title')}</div>
            <div className="subtitle">{t('subtitle')}</div>
            <div className="ctaContainer">
              <input
                // value={email}
                value={store.email}
                onChange={e => store.setEmail(e.target.value)}
                type="email"
                placeholder={t('email.placeholder')}
                className="emailBox"
              />
              <div className="startButton" onClick={() => onClickStartButton()}>
                <div>{t('start_button.text')}</div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <span className="cardRequired">{t('subtext')}</span>
              </div>
            </div>
          </div>
          {/* {list_topic.map((topic, index) => ( */}
          {store.homeTopic.map((topic, index) => (
            <div key={'topic_' + index + '_' + topic.tagId} className="fancyBoxBase marginBottom">
              <div className="sessionInfo">
                <img src={topic.image} className="sessionImage" />
                <div className="classInfoContainer">
                  <h3>{topic.tagName}</h3>
                  <p>{topic.tagDesc}</p>
                  {topic.tagAction == 'Loading' ? null : (
                    <Link href={`/register?topic=${topic.tagName}`}>
                      <div className="learnMore">{topic.tagAction}</div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* <div
            style={{
              textAlign: 'center',
              color: 'white',
              marginTop: 64,
              marginBottom: 32,
            }}>
            {t('makewith')}
          </div> */}
          {/* <div style={{ textAlign: 'center', color: 'white', marginTop: 64 }}>
            <a href="https://schola.tv/about_us" style={{ color: 'white' }}>
              {t('about_us')}
            </a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <a href="https://schola.tv/faq" style={{ color: 'white' }}>
              {t('terms_of_service')}
            </a>
          </div> */}
          <div style={{ textAlign: 'center', color: 'white', marginTop: 64 }}>
            <a href="#" style={{ color: 'white' }}>
              {t('about_us')}
            </a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <a href="#" style={{ color: 'white' }}>
              {t('terms_of_service')}
            </a>
          </div>
        </div>
      </div>
      {/* <Layout>
       <Features />
       <Showcases onGetShowcases={getShowcases} data={showcasesData} />
     </Layout> */}
    </>
  ));
}

const mapStateToProps = createStructuredSelector({
  showcasesData: selectShowcases(),
});

export function mapDispatchToProps(dispatch) {
  return { getShowcases: () => dispatch(getShowcases()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Home.propTypes = {
  showcasesData: PropTypes.object,
  getShowcases: PropTypes.func,
  t: PropTypes.func,
};

export default compose(withConnect, memo)(Home);
