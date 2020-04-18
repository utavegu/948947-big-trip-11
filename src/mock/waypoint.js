const MIN_PRICE = 10;
const MAX_PRICE = 500;
const YOUNGEST_OF_TIME = 0;
const OLDER_HOUR = 23;
const OLDER_MINUTE = 59;

// Так-то в модуль с константами можно сунуть, имхо. Мококонстантами. Запятая в конце - потому что могу. Йоубичез.
const eventTypeIcons = [`bus`, `checkin`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`,];

// Вот тут я так понял, должен быть массив городов, и что в конечном итоге должно это выглядеть как:
// 1) Тип события (самолётом, кораблём, поесть) плюс
// 2) слово in или to, выбираемое в зависимости от типа события
// 3) И собственно город, выбираемый из этого списка. Пока для простоты сделаю так, но возможно я что-то важное упустил.
const cities = [`Мытищи`, `Урюпинск`, `Елабуга`, `Тумтук`, `Кандрыкуль`,];
const separators = [` to `, ` in `];

// Я не понимаю что такое офферы, потому буду импровизировать.
// Так же я не понял и то, что написано тут, потому пока тупо строками сделал: "Обратите внимание, дополнительные опции — это отдельная структура данных с типом, к которому опция относится, названием и ценой, а не просто массив строк в структуре точки маршрута."
const offerNames = [`Дополнительное одеяло`, `Котов в багаж`, `Таблетка от укачивания у кока`, `Колонны не шатать`, `Третью колу оставьте себе. И первую тоже`,];

const setOfPhrases = [`Можно сделать отличное сэлфи`, `Тут вкусные коктейли`, `Прекрасный вид`, `Не дорого`, `Здесь должен побывать каждый`, `Увидеть и выжить`, `Дорогие друзья!`];

// Неплохо будет смотреться в утил.джээсе
// Случайное число
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// И ты тоже
// Случайный элемент массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const generateRandomTime = () => {
  const hour = getRandomIntegerNumber(YOUNGEST_OF_TIME , OLDER_HOUR);
  const minute = getRandomIntegerNumber(YOUNGEST_OF_TIME , OLDER_MINUTE);
  return `${castTimeFormat(hour)}:${castTimeFormat(minute)}`;
};

const generateOffers = (arr) => {
  const intermediateArray = new Array(getRandomIntegerNumber(0,5)).fill(``);
  intermediateArray.forEach(() => intermediateArray.push(`${getRandomArrayItem(arr)}<br><br>`));
  const offers = intermediateArray.splice(intermediateArray.length/2);
  // Можно ещё поработать над уникальностью данных, но пока мои полномочия всё
  return (offers);
};

// ВОООО! Вот этот способ работает как надо - его за основу общей функции бери.
// И когда сделаешь её отдельной - над уникальностью значений тоже подумай.
// Пока претенденты на её использование - фотки, офферы и дестинэйшины
const photo = Array(getRandomIntegerNumber(1,5)).fill(``);
photo.forEach(() => photo.push(`<img class="event__photo" src="img/photos/${getRandomIntegerNumber(1,5)}.jpg" alt="Какая-то фотка">`));









// Генерирую одну точку маршрута, она же "событие"
const generateEvent = () => {
  return {
    type: getRandomArrayItem(eventTypeIcons),
    price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
    planned: getRandomArrayItem(cities),
    offer: generateOffers(offerNames),
    offerPrice: getRandomIntegerNumber(MIN_PRICE/10, MAX_PRICE/10),
    startTime: generateRandomTime(),
    endTime: generateRandomTime(),
    separator: getRandomArrayItem(separators),
    phrase: generateOffers(setOfPhrases),
    photo,
  };
};

// Упаковываю массив объектами событий
const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};
