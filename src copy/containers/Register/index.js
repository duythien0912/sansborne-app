import styled from '@emotion/styled';
import SelectLanguages from 'components/Header/SelectLanguages';
import { useObserver } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { i18n } from 'utils/with-i18next';
// import Link from 'next/link';
import { Link, Router } from '../../../i18n';
import { userContext } from '../../context/user';
import { PostData, FetchData } from '../../lib/api';
import { gtagEvent } from '../../lib/gtag';

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

const rowItem = [
  'Space',
  'Robots',
  'Magic Tricks',
  'Art',
  'Music',
  'Video Game Coding',
  'Story Writing',
  'Dancing',
  'Reading',
  'Human Body',
  'Dinosaurs',
  'Yoga',
  'History',
  'Extreme Weather',
  'Machines',
  'Animals',
];

// const rowTimeEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const rowTimeJA = ['日曜日', '月曜', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
// const rowTimeVi = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

const rowTime = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ja: ['日曜日', '月曜', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  vi: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
};

export function Register({ t }) {
  // const router = useRouter();

  const store = useContext(userContext);
  const [select, setSelect] = useState(i18n.language);

  const handleClickTopic = index => {
    const newselect = store.topics;
    console.log(newselect);
    const indexOfItem = newselect.indexOf(store.registerTopic[index]);
    indexOfItem === -1 ? newselect.push(store.registerTopic[index]) : newselect.splice(indexOfItem, 1);
    console.log(newselect);
    store.setTopics(newselect);
    gtagEvent({
      action: 'user_select_topic',
      category: 'Topics',
      label: store.email,
      value: newselect,
    });
  };

  const handleClickTime = index => {
    const newTime = store.times;
    const indexOfItem = newTime.indexOf(rowTime[select][index]);
    indexOfItem === -1 ? newTime.push(rowTime[select][index]) : newTime.splice(indexOfItem, 1);
    store.setTimes(newTime);
    gtagEvent({
      action: 'user_select_time',
      category: 'Times',
      label: store.email,
      value: newTime,
    });
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    gtagEvent({
      action: 'submit_register_form',
      category: 'Register',
      label: store.email,
      value: store.getData(),
    });
    // if (!store.phone && !store.email) {
    //   store.setError('Email or Phone');
    //   return alert(t('error.email_phone'));
    // }
    if (!store.email) {
      store.setError('email error');
      return alert(t('error.email'));
    }

    try {
      var student = await PostData(`/lg/students?lang=${select}`, {
        studentName: store.name,
        studentEmail: store.email,
        studentPhone: store.phone,
        tags: [1, 2],
        times: store.times,
      });

      if (student.studentId) {
        store.setId(student.studentId);
        Router.push('/dashboard');
      } else {
        alert('Error unknow');
      }
    } catch (e) {}

    Router.push('/dashboard');
  };

  useEffect(() => {
    const { email } = Router.query;
    if (email) store.setEmail(email);

    async function fetchData() {
      var topics = await FetchData(`/lg/tags?lang=${select}`);
      store.setRegisterTopic(topics);
    }
    fetchData();
  }, [store]);

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
            <div className="registerHeader">{t('register.title')}</div>
            <div className="registerSectionTitle smallMarginTop">{t('register.subtitle_topic')}</div>
            <div className="rowContainer">
              {/* {rowItem.map((item, index) => ( */}
              {store.registerTopic.map((item, index) => (
                <div
                  key={'rowItem_' + index}
                  className={`rowItem ${
                    store.topics.some(topic => topic.tagId === item.tagId) ? ' selectedRowItem' : ''
                  }`}
                  onClick={() => handleClickTopic(index)}>
                  {item.tagName}
                </div>
              ))}
            </div>
            <div className="registerSectionTitle smallMarginTop">{t('register.subtitle_time')}</div>
            <div className="rowContainer">
              {rowTime[store.selectLang ?? 'vi'].map((item, index) => (
                <div
                  key={'rowTime_' + index}
                  className={`rowItem ${store.times.includes(item) ? ' selectedRowItem' : ''}`}
                  onClick={() => handleClickTime(index)}>
                  {item}
                </div>
              ))}
            </div>
            <div className="smallMarginTop"></div>
            <div className="registerSectionTitle smallMarginTop">{t('register.label_name')}</div>
            <input
              value={store.name}
              onChange={e => store.setName(e.target.value)}
              type="text"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_name')}
            />
            <div className="registerSectionTitle smallMarginTop">{t('register.label_email')}</div>
            <input
              value={store.email}
              onChange={e => store.setEmail(e.target.value)}
              type="email"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_email')}
            />
            <div className="registerSectionTitle smallMarginTop">{t('register.label_phone')}</div>
            <input
              value={store.phone}
              onChange={e => store.setPhone(e.target.value)}
              type="tel"
              className="fontSize18 fullWidth"
              placeholder={t('register.placeholder_phone')}
            />
            {/* <div className="registerSectionTitle smallMarginTop">{t('register.label_password')}</div>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="fontSize18 fullWidth"
              type="password"
            /> */}
            <button type="button" onClick={handleSubmit} className="registerButton">
              {t('register.button_action')}
            </button>
            {/* <div style={{ textAlign: 'left', color: 'white' }}>
              <SelectLanguages />
            </div> */}
          </div>
        </div>
      </div>
    </>
  ));
}

Register.propTypes = {
  t: PropTypes.func,
};

export default Register;
