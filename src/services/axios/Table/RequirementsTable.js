import axios from 'axios';

export function getRequirementData() {
  return axios.get('/Requirement');
}

export function getSkillsetData() {
  return axios.get('/skillset');
}

export function getClientsData() {
  return axios.get('/client');
}

export function getEmployeesData() {
  return axios.get('/employee');
}

export function deleteRequirementData(requirementId) {
  return axios.delete(`/Requirement/${requirementId}`);
}
