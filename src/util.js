const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Случайное число
// НУЖНОЕ МАКСИМАЛЬНОЕ ЗНАЧЕНИЕ УКАЗЫВАЙ НА ЕДИНИЧКУ БОЛЬШЕ!
// Или лучше почини "случайный элемент массива"
// Не забудь только потом значения везде поменять на -1
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

// вроде const
// если он про map ниже пишет, тот там у тебя два условия, но если ни одно не выполнилось - ничего не вернется. А должно. Втрой if возможно не нужен, ведь это вторая ситуация и третьей нет.
const smartFillArray = function (dataType, min, max, separator = `\n`) {
  // так тоже не называем, смотри базовые критерии по наименованию. Уже писал.
  let interimArr = new Array(getRandomInteger(min, max)).fill(``).map(() => {
    // А ЕЩЁ ЛУЧШЕ ЕСЛИ ЧЕРЕЗ КЕЙС! Поразбираюсь как раз
    // ВОН ВНИЗУ РАБОЧИЙ ПРИМЕР
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

// Какая-то непонятная и бессмысленная штука о_0
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Новая функция рэндера
// МИХАИЛУ - я честно говоря не понял сакральный смысл её переделывания (функции render)... мол первая работала со строками, вторая с дом элементами... В чём преимущества? Можете это как-то объяснить понятным языком с примерами. То, что было на лекции - как-то не объяснило ничего. Как и сакральный смысл функции createElement - по ней тоже объясните плес, если не затруднит
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/*
// Функция рендера (ПЕРВАЯ)... Пока нужна для лучшего понимания
const OLDrender = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};
*/

export {getRandomInteger, getRandomArrayItem, castTimeFormat, smartFillArray, RenderPosition, createElement, render};
