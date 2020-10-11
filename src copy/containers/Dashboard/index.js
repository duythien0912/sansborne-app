import styled from '@emotion/styled';
import { useObserver } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { i18n } from 'utils/with-i18next';
import { Link, Router } from '../../../i18n';
import { SelectLanguages } from '../../components/Header/SelectLanguages';
import { userContext } from '../../context/user';
import { FetchData, PostData } from '../../lib/api';
import { gtagEvent } from '../../lib/gtag';

const LogoImage = styled('img')`
  height: 70px;
  cursor: pointer;
`;

const ImgSuccess = styled('img')``;
//   animation: ${bounce} 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

const EmojiDiv = styled('div')`
  margin-top: 35px;
  margin-bottom: 20px;
`;

const SuccessText = styled('h1')`
  font-size: 42px;
  margin-top: 25px;
  color: #34cc34;
  letter-spacing: 0.1rem;
`;

const TextAlignCenter = styled('div')`
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;
// padding: 0px 24px;

export function Dashboard({ t }) {
  const [timeClass, setTimeClass] = useState('');
  const [modelOpen, setModelOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipBoard = async (copyMe, from) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
      alert('Copy Success');
      console.log(copyMe);
      gtagEvent({
        action: `user_copy_clipboard_${from}`,
        category: 'Times',
        label: store.email,
        value: copyMe,
      });
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const openInNewTab = url => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const store = useContext(userContext);

  const [select, setSelect] = useState(i18n.language);

  useEffect(() => {
    console.log(store.getData());
    if (!store.email) {
      Router.push({
        pathname: '/register',
        query: { email: store.email },
      });
    }

    async function fetchData() {
      var schedules = await FetchData(`/lg/schedules?lang=${select}`);
      store.setLesson(schedules);
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
              <SelectLanguages t={t} />
            </div>
            <div className="exploreClassesTitle">{t('dashboard.title')}</div>
            <div className="welcomeText">{t('dashboard.subtitle', { name: store.name || store.email })}</div>
            <div className="allClassesContainer">
              {store.lessons.map((item, index) => (
                <div key={`classContainer_${index}`} className="classContainer">
                  <div className="classTitle">{item.topic.title}</div>
                  <div className="tagsContainer">
                    {item.topic.tags.map((tag, index2) => (
                      <div
                        key={`tag_${index}_${index2}`}
                        className={`tag`}
                        style={{ background: tag.type == 0 ? 'rgb(227, 204, 255)' : '#ffd8fc' }}>
                        {tag.tagName}
                      </div>
                    ))}
                    {item.scheduleDate ? (
                      <div className={`tag`} style={{ background: 'rgb(227, 204, 255)' }}>
                        {/* {item.scheduleDate} */}
                        {new Date(item.scheduleDate + '+00:00').toLocaleString()}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="classText" style={{ marginTop: 16, marginBottom: 16 }} />
                  <img className="classImg" src={item.topic.image} />
                  {item.topic.teacher && item.topic.teacher.teacherName != 'Loading' ? (
                    <div className="teacherContainer">
                      <img src={item.topic.teacher.avatar} className="teacherImg" />
                      <div className="teacherName">{item.topic.teacher.teacherName}</div>
                    </div>
                  ) : (
                    ''
                  )}

                  <button
                    type="button"
                    onClick={async e => {
                      e.preventDefault();
                      gtagEvent({
                        action: 'user_book_class',
                        category: 'Book',
                        label: store.email,
                        value: item,
                      });
                      await PostData(`/lg/schedules/${item.scheduleId}/apply?lang=${select}`, {
                        studentId: store.id,
                      });

                      setModelOpen(true);
                      if (item.scheduleDate) {
                        setTimeClass(new Date(item.scheduleDate + '+00:00').toLocaleString());
                      }
                    }}
                    className="bookNowButton "
                    style={{ opacity: 1 }}>
                    {item.topic.topicAction ?? 'Book Now'}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div id="open-modal" className={`modal-window model-window_${modelOpen}`}>
                <div className="fancyBoxBase">
                  <button type="button" title="Close" className="modal-close" onClick={e => setModelOpen(false)}>
                    {t('success.close_action')}
                  </button>
                  <EmojiDiv className="emoji">
                    <ImgSuccess className={`model_${modelOpen}`} src="/static/images/tada.svg" width={120} />
                  </EmojiDiv>
                  <SuccessText>{t('success.title')}</SuccessText>
                  <TextAlignCenter>
                    {t('success.subtitle', { email: store.email, time: timeClass })}

                    <div
                      className="referralButton"
                      style={{ marginTop: '15px' }}
                      onClick={() =>
                        copyToClipBoard(
                          'https://' + window.location.hostname + `?utm_source=referral&utm_content=${store.email}`,
                          'model'
                        )
                      }>
                      {t('success.share_acion')}
                    </div>
                    <div
                      onClick={() => openInNewTab('https://www.facebook.com/groups/2924060617821426')}
                      className="referralText">
                      {t('dashboard.promote_group_action')}
                    </div>
                  </TextAlignCenter>
                </div>
              </div>
            </div>
            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 24 }}>
              {t('dashboard.promote_group')}
              <ul>
                <li>{t('dashboard.promote_group_li.0')}</li>
                <li>{t('dashboard.promote_group_li.1')}</li>
                <li>{t('dashboard.promote_group_li.2')}</li>
              </ul>
              <div
                onClick={() => openInNewTab('https://www.facebook.com/groups/2924060617821426')}
                className="referralButton">
                {t('dashboard.promote_group_action')}
              </div>
            </div>
            <div className="fancyBoxBase" style={{ marginTop: 24, marginBottom: 64 }}>
              {t('dashboard.promote_share')}
              <div
                className="referralButton"
                onClick={() =>
                  copyToClipBoard(
                    'https://' + window.location.hostname + `?utm_source=referral&utm_content=${store.email}`,
                    'fotter'
                  )
                }>
                {t('dashboard.promote_group_share')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ));
}

Dashboard.propTypes = {
  t: PropTypes.func,
};

export default Dashboard;
