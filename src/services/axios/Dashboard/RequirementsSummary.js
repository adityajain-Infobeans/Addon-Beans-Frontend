/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function getSummaryData(token) {
  return new Promise((resolve, reject) => {
    axios
      .get('/summary', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
