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

const fillData = (dataType, min, max, separator = `\n`) => {
  const interim = new Array(getRandomInteger(min, max)).fill(``).map(() => { // я не знаю как тебя фиксить, мне так всё нравится
    switch (typeof dataType) {
      case `function`:
        return dataType();
      case `object`:
        return getRandomArrayItem(dataType);
    }
  });
  const final = interim.join(separator);
  return final;
};

export {getRandomInteger, getRandomArrayItem, castTimeFormat, fillData};
