import axios from 'axios';
import { backend } from '../../configs/configs';
import * as actionTypes from '../actions';

export const getUserAct = (user) => {
  return {
    type: actionTypes.USER_GET,
    payload: { user },
  };
};

export const getAllUsersAct = (users) => {
  return {
    type: actionTypes.USER_GET_ALL,
    payload: { users },
  };
};

export const getAllCategoriesAct = (categories) => {
  return {
    type: actionTypes.CATEGORIES_GET_ALL,
    payload: { categories },
  };
};

export const getAllTopicsAct = (topics) => {
  return {
    type: actionTypes.TOPICS_GET_ALL,
    payload: { topics },
  };
};

export const getUser = (userId) => {
  return (dispatch) => {
    axios.get(`${backend}/user/get_user/${userId}/`)
      .then((result) => {
        console.log(result);
        dispatch(getUserAct(result.data));
      })
      .catch(error => console.log(error));
  };
};

export const getAllUsers = () => {
  return (dispatch) => {
    axios.get(`${backend}/user/get_all_users/`)
      .then((result) => {
        console.log(result);
        dispatch(getAllUsersAct(result.data));
      })
      .catch(error => console.log(error));
  };
};

export const getAllTopcis = () => {
  return (dispatch) => {
    axios.get(`${backend}/topic/list/`)
      .then((result) => {
        console.log(result);
        dispatch(getAllTopicsAct(result.data));
      })
      .catch(error => console.log(error));
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    axios.get(`${backend}/category/list/`)
      .then((result) => {
        console.log(result);
        dispatch(getAllCategoriesAct(result.data));
      })
      .catch(error => console.log(error));
  };
};
