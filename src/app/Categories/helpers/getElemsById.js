import getElemById from './getElemById';

export default function getElemsById(array, numbers) {
  const arr = [];
  numbers.map(number => arr.push(getElemById(array, number)));
  return arr;
}
