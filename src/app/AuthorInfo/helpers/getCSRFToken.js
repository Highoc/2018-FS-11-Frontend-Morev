import axios from 'axios';
import { backend, loginURL } from '../../../configs/configs';

export default function getCSRFToken() {
  return axios.get(`${backend}/${loginURL}/`)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}
