import {OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator} from "../const.js";
import {getRandomInteger, getRandomArrayItem, fillData} from "../util.js";

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

// TO DO WIP тут вообще всё переделаю кхерам потом
const generateOffersArray = (count) => {
  const innerOffers = [];
  for (let i = 0; i < count; i++) {
    innerOffers.push(generateOffer());
  }
  return innerOffers;
};
const offers = generateOffersArray(50);
const generateOffersElement = (count) => {
  const offersElementArr = [];
  for (let i = 0; i < count; i++) {
    offersElementArr.push(`${offers[Math.trunc(Math.random() * offers.length - 1)].hypertextForEvent()}`);
  }
  const finalArr = offersElementArr.join(`<br><br>`);
  return finalArr;
};
const generateOffersElementEdit = (count) => {
  const offersElementArr = [];
  for (let i = 0; i < count; i++) {
    offersElementArr.push(`${offers[Math.trunc(Math.random() * offers.length - 1)].hypertextForEventEdit()}`);
  }
  const finalArr = offersElementArr.join(``);
  return finalArr;
};
// до

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
  const randomInterim = getRandomInteger(msTranslator.MS_IN_HOUR, (msTranslator.MS_IN_DAY) * 3);
  endDate.setMilliseconds(startDate.getMilliseconds() + randomInterim);
  const timeSpent = endDate - startDate;
  const innerInterval = {
    startDate,
    endDate,
    timeSpent
  };
  return innerInterval;
};

const generateEvent = () => {
  return {
    type: getRandomArrayItem(eventType),
    city: getRandomArrayItem(CITIES),
    price: getRandomInteger(0, 501),
    offersElement: generateOffersElement(getRandomInteger(0, 4)),
    offersElementEdit: generateOffersElementEdit(getRandomInteger(0, 6)),
    phrase: fillData(setOfPhrases, 1, 6, `. `),
    photo: fillData(generateRandomPhoto, 1, 6),
    interval: generateRandomInterval(),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
