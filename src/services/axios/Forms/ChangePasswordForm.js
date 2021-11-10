/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function changePassword(newPassword) {
  return axios.put('/employee', newPassword);
}
