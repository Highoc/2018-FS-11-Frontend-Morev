import React, { Component } from 'react';
import CategoryPreview from './components/CategoryPreview';

export default class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listId: 1,
      categories: list,
    };
  }

  render() {
    const { listId, categories } = this.state;
    return (
      <div>
        <h3>Категории</h3>
        {
          categories.map(
            (category, i) => (
              <CategoryPreview
                key={category.id}
                category={category}
                topics={getSubArray(topics, category.topics)}
              />),
          )
        }
        <h3>{`Страница ${listId}`}</h3>
      </div>
    );
  }
}

const list = [
  { id: 1, name: 'Категория 1', description: 'Описание категории 1', topics: [1, 5, 6, 8] },
  { id: 2, name: 'Категория 2', description: 'Описание категории 2', topics: [1, 2, 9, 8] },
  { id: 3, name: 'Категория 3', description: 'Описание категории 3', topics: [3, 5, 6, 8] },
  { id: 4, name: 'Категория 4', description: 'Описание категории 4', topics: [5, 6, 7, 8] },
  { id: 5, name: 'Категория 5', description: 'Описание категории 5', topics: [1, 3, 6, 9] },
  { id: 6, name: 'Категория 6', description: 'Описание категории 6', topics: [2, 5, 6, 8] },
];

const topics = [
  { id: 1, name: 'Топик 1', description: 'Описание топика 1' },
  { id: 2, name: 'Топик 2', description: 'Описание топика 2' },
  { id: 3, name: 'Топик 3', description: 'Описание топика 3' },
  { id: 4, name: 'Топик 4', description: 'Описание топика 4' },
  { id: 5, name: 'Топик 5', description: 'Описание топика 5' },
  { id: 6, name: 'Топик 6', description: 'Описание топика 6' },
  { id: 7, name: 'Топик 7', description: 'Описание топика 7' },
  { id: 8, name: 'Топик 8', description: 'Описание топика 8' },
  { id: 9, name: 'Топик 9', description: 'Описание топика 9' },
  { id: 10, name: 'Топик 10', description: 'Описание топика 10' },
];

const getSubArray = (array, numbers) => {
  const arr = [];
  numbers.map(number => arr.push(array[number]));
  return arr;
};
