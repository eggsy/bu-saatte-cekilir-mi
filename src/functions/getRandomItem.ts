export const getRandomItem = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export default getRandomItem;
