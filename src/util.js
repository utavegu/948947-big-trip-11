const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length);
  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// TO DO Я так понял, тут замечание было по критерию Б9, но тогда не понимаю, почему getRandomArrayItem проходит
const fillData = (dataType, min, max, separator = `\n`) => {
  const interim = new Array(getRandomInteger(min, max)).fill(``).map(() => {
    if (typeof dataType === `function`) {
      return dataType();
    }
    if (typeof dataType === `object`) {
      return getRandomArrayItem(dataType);
    }
  });
  const final = interim.join(separator);
  return final;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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
const OLDrender = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};
*/

export {getRandomInteger, getRandomArrayItem, castTimeFormat, fillData, RenderPosition, createElement, render};
