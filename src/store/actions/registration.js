import axios from 'axios';
import * as actionTypes from './actionTypes';
import { backend, registrationURL } from '../../configs/configs';
import { login } from './auth';

export const registrationStart = () => {
  return {
    type: actionTypes.REGISTRATION_START,
  };
};

export const registrationSuccess = () => {
  return {
    type: actionTypes.REGISTRATION_SUCCESS,
  };
};

export const registrationFailed = (error) => {
  return {
    type: actionTypes.REGISTRATION_FAILED,
    error,
  };
};

export const registration = (data) => {
  return (dispatch) => {
    dispatch(registrationStart());
    axios.post(`${backend}/${registrationURL}/`, data)
      .then((result) => {
        console.log(result);
        const { username, password1 } = data;
        dispatch(registrationSuccess());
        dispatch(login(username, password1));
      })
      .catch((error) => {
        console.log(error);
        dispatch(registrationFailed(error));
      });
  };
};
