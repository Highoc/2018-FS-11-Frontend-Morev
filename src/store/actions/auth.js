import axios from 'axios';
import * as actionTypes from './actionTypes';
import { backend, loginURL } from '../../configs/configs';
import { getUser } from './categories';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: { token, userId },
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOGOUT,
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios.post(`${backend}/${loginURL}/`, { username, password })
      .then((result) => {
        console.log(result);
        const { token, userId } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        dispatch(getUser(userId));
        dispatch(loginSuccess(token, userId));
      })
      .catch((error) => {
        alert('401 Unauthorized');
        console.log(error);
        dispatch(loginFailed(error));
      });
  };
};

export const loginCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(loginSuccess(token, userId));
    }
  };
};
