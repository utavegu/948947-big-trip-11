import {EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, typeTranslator} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, castTimeFormat, fillAnArray_VER2} from "../util.js";

// Дополнительные опции (офферы)
const generateOffer = () => {
  return {
    action: getRandomArrayItem(OFFERS_ACTIONS),
    price: getRandomIntegerNumber(0, 101),
    type: getRandomArrayItem(eventType),
    _randomChecker: Math.trunc(Math.random()*1000),
    hypertextForEvent: function() {
      return `<li class="event__offer">
                <span class="event__offer-title">${this.action}</span>
                &plus; &euro;&nbsp;
                <span class="event__offer-price">${this.price}</span>
              </li>`
    },
    hypertextForEventEdit: function() {
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-LUGGAGE-${this._randomChecker}" type="checkbox" name="event-offer-LUGGAGE" checked>
                <label class="event__offer-label" for="event-offer-LUGGAGE-${this._randomChecker}">
                  <span class="event__offer-title">${this.action}</span>
                  &plus; &euro;&nbsp;
                  <span class="event__offer-price">${this.price}</span>
                </label>
              </div>`
    },
  };
};

const generateRandomPhoto = () => {
  const photoElement = `<img class="event__photo" src="./img/photos/${getRandomIntegerNumber(1,26)}.jpg" alt="Какая-то фотка"></img>`;
  return photoElement;
};

// нужные параметры - минимум, максимум, функция-генератор рандомных элементов, сепаратор (по умолчанию - \n)
// И функцию мап потом переделай в стрелочную
// А можно даже не колбэк, можно эррэй... И возвращать рандомный элемент массива...
// нафига там 2 двоеточия!
// ТАК ТО МОЖНО ПРОВЕРОЧКУ СДЕЛАТЬ НА ФУНКЦИЯ/МАССИВ/ЭЛЕМЕНТ И ИСХОДЯ ИЗ ЭТОГО МЕНЯТЬ РЕТУРН
const FillArrayforCallback = (callback, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomIntegerNumber(min, max)).fill(``).map(function () {
    return callback();
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}

const FillArrayforArray = (arrayConst, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomIntegerNumber(min, max)).fill(``).map(function () {
    return getRandomArrayItem(arrayConst);
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}

const FillArrayforElement = (element, min, max, separator = '\n') => {
  let interimArr = new Array(getRandomIntegerNumber(min, max)).fill(``).map(function () {
    return element;
  });;
  const finalArr = interimArr.join(separator);
  return finalArr;
}

const photoGallery = FillArrayforCallback(generateRandomPhoto, 1, 6);
const phrase = FillArrayforArray(setOfPhrases, 1, 6, '. ');


// ИСТИНА ГДЕ-ТО РЯДОМ!!!
const offers = [];
offers.push(generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer(),generateOffer());
const offersElement1 = `${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEvent()}${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEvent()}${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEvent()}`
const offersElement2 = `${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEventEdit()}${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEventEdit()}${offers[Math.trunc(Math.random()*offers.length-1)].hypertextForEventEdit()}`

/*
const summonOfferEdit = offers[0].hypertextForEventEdit();
const offersElement2 = FillArrayforElement(summonOfferEdit, 0, 4);
*/

// В этом году никаких отпусков! Пандемия!
const startDate = new Date(
  2021,
  5,
  20,
  8,
  20
);
const endDate = new Date(
  2021, // год
  getRandomIntegerNumber(6, 8), // месяц (-1 от реального, ибо с нуля)
  getRandomIntegerNumber(21, 31), // день
  getRandomIntegerNumber(0, 24), // часов
  getRandomIntegerNumber(0, 60) // минут
);
const timeSpent = endDate - startDate;

// Генерирую одну точку маршрута, она же "событие" (параметр event)
const generateEvent = () => {
  return {
    type: getRandomArrayItem(eventType),
    city: getRandomArrayItem(CITIES),
    price: getRandomIntegerNumber(0, 501),
    offersElement1,
    offersElement2,
    phrase,
    photo: photoGallery,
    startDate,
    endDate,
    timeSpent,
  };
};

// Упаковываю массив объектами событий
const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};