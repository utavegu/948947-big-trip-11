const EVENT_COUNT = 10;

const OFFERS_ACTIONS = [
  `Дополнительное одеяло`,
  `Котов в багаж`,
  `Таблетка от укачивания у кока`,
  `Колонны не шатать`,
  `Третью колу оставьте себе. И первую тоже`,
  `Помочиться на колесо автобуса`,
  `Поорать в окошко`,
  `Шлёпнуть стюардессу`,
  `Кетчунез для бурито`,
  `Дразнить гвардейца`,
  `Прыгнуть бомбочкой в бассейн с криком "ТАААААГИИИЛ!!111!"`,
  `Арбуз джуз!`,
  `Съесть жаренного таракана`,
  `Спереть полотенце из отеля`,
  `Пукнуть в душном автобусе`,
  `Покормить аниматора`,
  `Фото с обезьянкой`,
  `Вареная кукуруза`,
  `Наладить дипломатические отношения с тайландскими путанами`,
  `Принять участие в гей-параде`,
  `Ударить в рынду`,
  `Затариться турецким золотом`,
  `Погладить осьминога`
];

const CITIES = [
  `Mytishy`,
  `Uriupinsk`,
  `Elabuga`,
  `Tumtuk`,
  `Kandykul`
];

const setOfPhrases = [
  `Можно сделать отличное сэлфи`,
  `Тут вкусные коктейли`,
  `Прекрасный вид`,
  `Не дорого`,
  `Здесь должен побывать каждый`,
  `Увидеть и выжить`,
  `Дорогие друзья!`
];

const eventType = [
  {name: `bus`, preposition: ` to `},
  {name: `checkin`, preposition: ` in `},
  {name: `drive`, preposition: ` to `},
  {name: `flight`, preposition: ` to `},
  {name: `restaurant`, preposition: ` in `},
  {name: `ship`, preposition: ` to `},
  {name: `sightseeing`, preposition: ` in `},
  {name: `taxi`, preposition: ` to `},
  {name: `train`, preposition: ` to `},
  {name: `transport`, preposition: ` to `}
];

const MS_IN_SEC = 1000;
const MS_IN_MIN = MS_IN_SEC * 60;
const MS_IN_HOUR = MS_IN_MIN * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const msTranslator = {
  MS_IN_SEC,
  MS_IN_MIN,
  MS_IN_HOUR,
  MS_IN_DAY
};

const sortBy = {
  ascending(a, b) {
    return a - b;
  }
};

const MonthTranslator = {
  0: `JAN`,
  1: `FEB`,
  2: `MAR`,
  3: `APR`,
  4: `MAY`,
  5: `JUN`,
  6: `JUL`,
  7: `AUG`,
  8: `SEP`,
  9: `OCT`,
  10: `NOV`,
  11: `DEC`
};

export {EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, sortBy, MonthTranslator};
