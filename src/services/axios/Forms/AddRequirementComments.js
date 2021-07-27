const axios = require('axios');

export function postComment(token, requirementId, comment) {
  return axios
    .post(
      '/comment',
      {
        requirement_id: requirementId,
        comment,
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

export function getRequirementIdData(token, requirementId) {
  return axios
    .get(`/Requirement/${requirementId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}

export function updateStatus(token, requirementId, status) {
  return axios
    .put(
      `/Requirement/${requirementId}`,
      {
        status,
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
