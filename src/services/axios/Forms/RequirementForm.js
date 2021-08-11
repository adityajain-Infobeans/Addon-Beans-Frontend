const axios = require('axios');

export function postRequirement(requirementData) {
  return axios.post('/Requirement', requirementData);
}

export function updateRequirement(requirementId, requirementData) {
  return axios.put(`/Requirement/${requirementId}`, requirementData);
}
