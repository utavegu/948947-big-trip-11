const EVENT_COUNT = 3; // Количество событий

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
  `Спереть полотенце из отеля`,
  `Пукнуть в душном автобусе`,
  `Покормить аниматора`,
  `Фото с обезьянкой`,
  `Вареная кукуруза`
];

const CITIES = [
  `Мытищи`,
  `Урюпинск`,
  `Елабуга`,
  `Тумтук`,
  `Кандрыкуль`
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
  {name: `bus`, pretext: ` to `},
  {name: `checkin`, pretext: ` in `},
  {name: `drive`, pretext: ` to `},
  {name: `flight`, pretext: ` to `},
  {name: `restaurant`, pretext: ` in `},
  {name: `ship`, pretext: ` to `},
  {name: `sightseeing`, pretext: ` in `},
  {name: `taxi`, pretext: ` to `},
  {name: `train`, pretext: ` to `},
  {name: `transport`, pretext: ` to `}
];

// Не получилось тоже самое провернуть внутри объекта, потому сделал так... дело наверное в том, что const, потом попробую let... хотя не должно по логике...

const sec = 1000; // Миллисекунд в секунде
const min = sec*60; // Миллисекунд в минуте
const hour = min*60; // Миллисекунд в часе
const day = hour*24; // Миллисекунд в дне


const msTranslator = {
  sec,
  min,
  hour,
  day
};

const typeTranslator = {
  bus: `Автобусом`,
  checkin: `Ебануть сэлфи`,
  drive: `На машине`,
  flight: `Самолетом`,
  restaurant: 'Зохавать бурито',
  ship: `Пароходом`,
  sightseeing: `Посмотреть что-то`,
  taxi: `Вези меня!..`,
  train: `На поезде`,
  transport: `На Сапсане`,
};

export {EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, typeTranslator};