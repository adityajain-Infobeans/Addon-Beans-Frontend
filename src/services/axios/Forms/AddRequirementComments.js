const axios = require('axios');

export function postComment(ApiData) {
  return axios.post('/comment', ApiData);
}

export function getRequirementIdData(requirementId) {
  return axios.get(`/Requirement/${requirementId}`);
}

export function updateStatus(requirementId, status) {
  return axios.put(`/Requirement/${requirementId}`, status);
}
