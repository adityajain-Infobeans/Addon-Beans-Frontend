/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function getSummaryData() {
  return axios.get('/summary');
}
