/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function changePassword(token, newPassword) {
  return axios
    .put(
      '/employee',
      {
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error);
}
