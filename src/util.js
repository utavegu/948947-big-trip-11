// Случайное число
// НУЖНОЕ МАКСИМАЛЬНОЕ ЗНАЧЕНИЕ УКАЗЫВАЙ НА ЕДИНИЧКУ БОЛЬШЕ!
const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Случайный элемент массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);
  return array[randomIndex];
};

// Нужное отображение формата времени
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Отсюда и до конца - я их оставлю пока чтобы вы видели эволюцию моего мыщления)))
// Ну и мне как шпаргалка пригодятся тоже. Перед защитой вычищу
// Придётся закомментировать, чтобы линтер не ругался

/*
// Так наверное нельзя параметры называть, да?
const fillAnArray_VER1 = (element, min, max) => {
  const arr = new Array(getRandomInteger(min, max)).fill(``);
  const newArr = arr.map(() => {return element});
  return newArr;
};

// Вот эта вроде лучшая пока... уже нет
const fillAnArray_VER2 = (element, min, max) => {
  return new Array(getRandomInteger(min, max)).fill(``).map(function () {
    return element;
  });
};

const fillAnArray_VER3 = (element, min, max) => {
  const arr = new Array(getRandomInteger(min, max)).fill(``);
  arr.forEach(() => arr.push(element));
  arr.splice(0, arr.length/2);
  return arr
};

const fillAnArray_VER4 = (element, min, max) => {
    let arr = [];
    for (let i = 0; i < getRandomInteger(min, max); i++) {
      arr.push(element);
    }
  return arr
};

const FillArrayforCallback = (callback, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomInteger(min, max)).fill(``).map(function () {
    return callback();
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}

const FillArrayforArray = (arrayConst, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomInteger(min, max)).fill(``).map(function () {
    return getRandomArrayItem(arrayConst);
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}

const FillArrayforElement = (element, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomInteger(min, max)).fill(``).map(function () {
    return element;
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}
*/

const smartFillArray = (dataType, min, max, separator = `\n`) => {
  // Не пойму, чего тут линтер от меня хочет
  // Expected to return a value at the end of arrow function  consistent-return
  let interimArr = new Array(getRandomInteger(min, max)).fill(``).map(() => {
    // А ЕЩЁ ЛУЧШЕ ЕСЛИ ЧЕРЕЗ КЕЙС! Поразбираюсь как раз
    if (typeof dataType === `function`) {
      return dataType();
    }
    if (typeof dataType === `object`) {
      return getRandomArrayItem(dataType);
    }
  });
  const finalArr = interimArr.join(separator);
  return finalArr;
};

export {getRandomInteger, getRandomArrayItem, castTimeFormat, smartFillArray};
