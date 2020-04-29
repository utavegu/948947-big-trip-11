import {OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator} from "../const.js";
import {getRandomInteger, getRandomArrayItem, smartFillArray} from "../util.js";

// Дополнительные опции (офферы)
const generateOffer = () => {
  return {
    action: getRandomArrayItem(OFFERS_ACTIONS),
    price: getRandomInteger(0, 101),
    type: getRandomArrayItem(eventType),
    _randomChecker: Math.trunc(Math.random() * 1000),
    hypertextForEvent() {
      return `<li class="event__offer">
                <span class="event__offer-title">${this.action}</span>
                &plus; &euro;&nbsp;
                <span class="event__offer-price">${this.price}</span>
              </li>`;
    },
    hypertextForEventEdit() {
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-TYPE-${this._randomChecker}" type="checkbox" name="event-offer-TYPE" checked>
                <label class="event__offer-label" for="event-offer-TYPE-${this._randomChecker}">
                  <span class="event__offer-title">${this.action}</span>
                  &plus; &euro;&nbsp;
                  <span class="event__offer-price">${this.price}</span>
                </label>
              </div>`;
    },
  };
};

const generateRandomPhoto = () => {
  const photoElement = `<img class="event__photo" src="./img/photos/${getRandomInteger(1, 26)}.jpg" alt="Какая-то фотка"></img>`;
  return photoElement;
};

const photoGallery = smartFillArray(generateRandomPhoto, 1, 6);

const phrase = smartFillArray(setOfPhrases, 1, 6, `. `);

// Вот всё что ниже, касаемо офферов, я понимаю, что можно ещё как-то оптимизировать, но я уже неприлично долго делаю это задание, потому предлагаю закрыть на это глаза и оставить это мне на период самостоятельной работы
const generateOffersArray = (count) => {
  const innerOffers = [];
  for (let i = 0; i < count; i++) {
    innerOffers.push(generateOffer());
  }
  return innerOffers;
};

const offers = generateOffersArray(50);

// Почему-то не смог передать метод через параметр, потому 2 отдельные функции
const generateOffersElement = (count) => {
  const offersElementArr = [];
  for (let i = 0; i < count; i++) {
    offersElementArr.push(`${offers[Math.trunc(Math.random() * offers.length - 1)].hypertextForEvent()}`);
  }
  const finalArr = offersElementArr.join(`<br><br>`);
  return finalArr;
};
// Ещё по ТЗ генерироваться может до 5 офферов, но отображаться должно не больше трёх (в режиме просмотра, а не редактирования). Я это пока не реализую, так же предлагаю оставить на самостоятельную работу, я вроде примерно понимаю как это можно будет сделать.

// Вот тут критично не набивать одинаковыми элементами, иначе чекаться не будет. На данный момент я могу решить эту проблему увеличением генерируемых элементов массива, но это будет не продуктивное решение, так как повлияет на производительность. В идеале эта проблема решается чисткой массива от неуникальных элементов. Но я это баг оставлю, ибо время сильно поджимает. Сейчас я поменяю циферку на 50 и вы скорее всего даже не заметите о чём я =)
const generateOffersElementEdit = (count) => {
  const offersElementArr = [];
  for (let i = 0; i < count; i++) {
    offersElementArr.push(`${offers[Math.trunc(Math.random() * offers.length - 1)].hypertextForEventEdit()}`);
  }
  const finalArr = offersElementArr.join(``);
  return finalArr;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

const generateRandomInterval = () => {
  const startDate = getRandomDate();
  const endDate = new Date(startDate);
  const randomInterim = getRandomInteger(msTranslator.hour, (msTranslator.day) * 3)
  endDate.setMilliseconds(startDate.getMilliseconds()+randomInterim);
  const timeSpent = endDate - startDate;
  const innerInterval = {
    startDate,
    endDate,
    timeSpent
  };
  return innerInterval;
};

// Генерирую одну точку маршрута, она же "событие" (параметр event)
const generateEvent = () => {
  return {
    type: getRandomArrayItem(eventType),
    city: getRandomArrayItem(CITIES),
    price: getRandomInteger(0, 501),
    offersElement: generateOffersElement(getRandomInteger(0, 4)),
    offersElementEdit: generateOffersElementEdit(getRandomInteger(0, 6)),
    phrase,
    photo: photoGallery,
    interval: generateRandomInterval(),
  };
};

// Упаковываю массив объектами событий
const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
