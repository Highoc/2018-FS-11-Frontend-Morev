import * as actionTypes from '../actions';

const initialState = {
  categories: [],
  topics: [],
  users: [],
};

const userGet = (state, action) => {
  const updated = state.users;
  const { user } = action.payload;
  if (updated.every(elem => elem.id !== user.id)) updated.push(user);
  return {
    ...state,
    users: updated,
  };
};

const userGetAll = (state, action) => {
  const { users } = action.payload;
  return {
    ...state,
    users,
  };
};

const categoriesGetAll = (state, action) => {
  const { categories } = action.payload;
  return {
    ...state,
    categories,
  };
};

const topicsGetAll = (state, action) => {
  const { topics } = action.payload;
  return {
    ...state,
    topics,
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_GET: return userGet(state, action);
    case actionTypes.USER_GET_ALL: return userGetAll(state, action);
    case actionTypes.CATEGORIES_GET_ALL: return categoriesGetAll(state, action);
    case actionTypes.TOPICS_GET_ALL: return topicsGetAll(state, action);
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
