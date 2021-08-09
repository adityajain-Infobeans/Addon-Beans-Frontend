import axios from 'axios';
import store from '../../store';

axios.interceptors.request.use(
  (config) => {
    const token = store.getters['Auth/token'];
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export function getSummaryData() {
  return axios.get('/summary');
}

export function postComment(ApiData) {
  return axios.post('/comment', ApiData);
}

// export default {
//   getSummaryData() ,
//   postComment(data) {
//     return axios.post('/comment', data);
//   },
// };
