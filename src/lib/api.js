import { request } from 'utils/request';

// const BASE_URL = 'http://18.138.215.174:8086';
// const BASE_URL = 'https://kidslive.schola.tv';
const BASE_URL = '';

const FetchData = async url => {
  return await request(BASE_URL + url);
};

const PostData = async (url, body) => {
  return await request(BASE_URL + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export { FetchData, PostData };
