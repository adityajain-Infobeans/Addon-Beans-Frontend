const axios = require('axios');

export function postRequirement(requirementData) {
  return axios.post('/Requirement', requirementData);
}

export function updateRequirement(requirementData) {
  return axios.put(`/Requirement/${requirementId}`, requirementData);
}
