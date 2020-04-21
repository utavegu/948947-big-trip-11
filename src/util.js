// Случайное число
// НУЖНОЕ МАКСИМАЛЬНОЕ ЗНАЧЕНИЕ УКАЗЫВАЙ НА ЕДИНИЧКУ БОЛЬШЕ!
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Случайный элемент массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

// Нужное отображение формата времени
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Так наверное нельзя параметры называть, да?
const fillAnArray_VER1 = (element, min, max) => {
  const arr = new Array(getRandomIntegerNumber(min, max)).fill(``);
  const newArr = arr.map(() => {return element});
  return newArr;
};

// Вот эта вроде лучшая пока
const fillAnArray_VER2 = (element, min, max) => {
  return new Array(getRandomIntegerNumber(min, max)).fill(``).map(function () {
    return element;
  });
};

const fillAnArray_VER3 = (element, min, max) => {
  const arr = new Array(getRandomIntegerNumber(min, max)).fill(``);
  arr.forEach(() => arr.push(element));
  arr.splice(0, arr.length/2);
  return arr
};

const fillAnArray_VER4 = (element, min, max) => {
    let arr = [];
    for (let i = 0; i < getRandomIntegerNumber(min, max); i++) {
      arr.push(element);
    }
  return arr
};

export {getRandomIntegerNumber, getRandomArrayItem, castTimeFormat, fillAnArray_VER2};