const NextI18Next = require('next-i18next').default;
const config = require('next/config').default();
const get = require('lodash/get');

const localeSubpaths = get(config, 'publicRuntimeConfig.localeSubpaths', 'none');

const EN = 'en';
const JA = 'ja';
const VI = 'vi';

const localeSubpathMapping = {
  none: {},
  en: EN,
  ja: JA,
  vi: VI,
  all: {
    en: EN,
    ja: JA,
    vi: VI,
  },
};

module.exports = new NextI18Next({
  defaultNS: 'common',
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  defaultLanguage: 'vi',
  otherLanguages: [EN, JA, VI],
  localeSubpaths: localeSubpathMapping[localeSubpaths],
});
