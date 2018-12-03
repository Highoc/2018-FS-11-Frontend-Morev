import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  error: null,
  loading: false,
  userId: 0,
};

const loginStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    token: action.payload.token,
    userId: Number(action.payload.userId),
    error: null,
    loading: false,
  };
};

const loginFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const logout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: 0,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAILED: return loginFail(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    default: return state;
  }
};

export default reducer;
