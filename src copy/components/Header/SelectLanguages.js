import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { i18n, withTranslation } from 'utils/with-i18next';
import { gtagEvent } from '../../lib/gtag';
// import { Router } from '../../../i18n';
import { userContext } from '../../context/user';
import { FetchData } from '../../lib/api';

// const delay = ms => new Promise(res => setTimeout(res, ms));

const SelectRoot = styled('select')`
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 5px;
  background: transparent;
  color: white;
  font-size: 1.03rem;
  box-shadow: none;
  margin: 0px;
  text-align: center;
  text-align-last: center;
  -moz-text-align-last: center;
`;

export function SelectLanguages({ t }) {
  const [select, setSelect] = useState(i18n.language);
  const store = useContext(userContext);

  useEffect(() => {
    i18n.changeLanguage(select);
  }, [select]);

  const handleSelect = async ev => {
    ev.preventDefault();
    gtagEvent({
      action: 'user_change_language',
      category: 'Language',
      value: ev.target.value,
    });

    setSelect(ev.target.value);
    store.setLang(ev.target.value);
    // await delay(500);
    // window.location.reload();
    function fetchData() {
      FetchData(`/lg/schedules?lang=${ev.target.value}`).then(schedules => {
        store.setLesson(schedules);
      });
      FetchData(`/lg/tags/super?lang=${ev.target.value}`).then(topics => {
        store.setHomeTopic(topics);
      });
      FetchData(`/lg/tags?lang=${ev.target.value}`).then(topicsR => {
        store.setRegisterTopic(topicsR);
      });
    }
    fetchData();
  };

  return (
    <div className="dropdown-container">
      <SelectRoot name="languages" id="languages" value={select} onChange={handleSelect}>
        <option value="en">{t('en')}</option>
        <option value="vi">{t('vi')}</option>
        <option value="ja">{t('ja')}</option>
      </SelectRoot>
    </div>
  );
}

SelectLanguages.propTypes = {
  t: PropTypes.func,
};

export default withTranslation('common')(SelectLanguages);

// export default SelectLanguages;
