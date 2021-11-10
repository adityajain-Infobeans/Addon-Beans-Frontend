/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function getComment(RequirementId) {
  return axios.get(`/comment/T_${RequirementId}`);
}
