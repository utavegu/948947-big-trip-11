import {OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator} from "../const.js";
import {getRandomInteger, getRandomArrayItem, fillData} from "../utils/common.js";

const generateOffer = () => {
  return {
    action: getRandomArrayItem(OFFERS_ACTIONS),
    price: getRandomInteger(0, 101),
    type: getRandomArrayItem(eventType),
    _randomChecker: Math.trunc(Math.random() * 10000),
  };
};

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomInteger(0, 6); i++) {
    offers.push(generateOffer());
  }
  return offers;
};

const generateRandomPhoto = () => {
  const photoElement = `<img class="event__photo" src="./img/photos/${getRandomInteger(1, 38)}.jpg" alt="Какая-то фотка"></img>`;
  return photoElement;
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
    offers: generateOffers(),
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
