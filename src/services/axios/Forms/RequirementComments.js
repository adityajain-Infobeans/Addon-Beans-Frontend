/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function getComment(token, RequirementId) {
  return axios
    .get(`/comment/T_${RequirementId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}
