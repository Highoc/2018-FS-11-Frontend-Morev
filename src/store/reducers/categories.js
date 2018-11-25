import * as actionTypes from '../actions';

const initialState = {
  categories: [
    { id: 1, name: 'Категория 1', description: 'Описание категории 1', topics_id: [1, 5, 6, 8] },
    { id: 2, name: 'Категория 2', description: 'Описание категории 2', topics_id: [1, 2, 9, 8] },
    { id: 3, name: 'Категория 3', description: 'Описание категории 3', topics_id: [3, 5, 6, 8] },
    { id: 4, name: 'Категория 4', description: 'Описание категории 4', topics_id: [5, 6, 7, 8] },
    { id: 5, name: 'Категория 5', description: 'Описание категории 5', topics_id: [1, 3, 6, 9] },
    { id: 6, name: 'Категория 6', description: 'Описание категории 6', topics_id: [2, 5, 6, 8] },
    { id: 7, name: 'Категория 7', description: 'Описание категории 7', topics_id: [1, 5, 6, 8] },
    { id: 8, name: 'Категория 8', description: 'Описание категории 8', topics_id: [1, 2, 9, 8] },
    { id: 9, name: 'Категория 9', description: 'Описание категории 9', topics_id: [3, 5, 6, 8] },
    { id: 10, name: 'Категория 10', description: 'Описание категории 10', topics_id: [5, 6, 7, 8] },
    { id: 11, name: 'Категория 11', description: 'Описание категории 11', topics_id: [1, 3, 6, 9] },
    { id: 12, name: 'Категория 12', description: 'Описание категории 12', topics_id: [2, 5, 6, 8] },
  ],
  topics: [
    { id: 1, author_id: 1, name: 'Топик 1', description: 'Описание топика 1', categories_id: [1, 2, 5, 7, 8, 11] },
    { id: 2, author_id: 2, name: 'Топик 2', description: 'Описание топика 2', categories_id: [2, 6, 8, 12] },
    { id: 3, author_id: 1, name: 'Топик 3', description: 'Описание топика 3', categories_id: [3, 5, 9, 11] },
    { id: 4, author_id: 3, name: 'Топик 4', description: 'Описание топика 4', categories_id: [] },
    { id: 5, author_id: 1, name: 'Топик 5', description: 'Описание топика 5', categories_id: [1, 3, 4, 6, 7, 9, 10, 12] },
    { id: 6, author_id: 3, name: 'Топик 6', description: 'Описание топика 6', categories_id: [1, 3, 4, 5, 6, 7, 9, 10, 11, 12] },
    { id: 7, author_id: 2, name: 'Топик 7', description: 'Описание топика 7', categories_id: [4, 10] },
    { id: 8, author_id: 1, name: 'Топик 8', description: 'Описание топика 8', categories_id: [1, 2, 3, 4, 6, 7, 8, 9, 10, 12] },
    { id: 9, author_id: 4, name: 'Топик 9', description: 'Описание топика 9', categories_id: [2, 5, 8, 11] },
    { id: 10, author_id: 4, name: 'Топик 10', description: 'Описание топика 10', categories_id: [] },
  ],
  users: [
    { id: 0, login: 'anonymous', name: '', surname: ''},
    { id: 1, login: 'admin', name: 'Админ', surname: 'Админов'},
    { id: 2, login: 'highoc', name: 'Максим', surname: 'Морев'},
    { id: 3, login: 'jokerety', name: 'Роман', surname: 'Маслов'},
    { id: 4, login: 'martin', name: 'Мартин', surname: 'Комитски'},
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORIES_INIT:
      return {
        ...state,
        categories: [],
      };

    case actionTypes.CATEGORIES_REMOVE:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.id),
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
