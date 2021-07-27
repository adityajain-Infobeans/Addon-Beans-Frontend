const axios = require('axios');

export function getRequirementData(token) {
  return axios
    .get('/Requirement', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}

export function getSkillsetData(token) {
  return axios
    .get('/skillset', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}

export function getClientsData(token) {
  return axios
    .get('/client', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}

export function getEmployeesData(token) {
  return axios
    .get('/employee', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}

export function deleteRequirementData(token) {
  return axios
    .delete(`/Requirement/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}
