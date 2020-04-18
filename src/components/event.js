// Разметка события
const createEvent = (event) => {
  const HOURS_IN_DAY = 24;
  const MINUTES_IN_HOUR = 60;

  // Теперь, когда объекты пустые - всё понятно. Но не понятно зачем и почему бы просто не обращаться к полям объекта
  const {type, price, planned, offer, offerPrice, startTime, endTime, separator} = event;

  const typeDict = {
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

  // ВОТ ОТСЮДА И ДО НАЧАЛА РАЗМЕТКИ - ДУМАЮ, МОЖНО БЫЛО КАК-ТО ПРОЩЕ СДЕЛАТЬ, СРЕДСТВАМИ JS.
  // НЕ ГОВОРЯ УЖ О ТОМ, ЧТО НЕ В ЭТОМ МОДУЛЕ
  // НУ И, КСТАТИ, У ТАКОГО СПОСОБА ТОЖЕ ЕСТЬ БАГИ, ЧТОБЫ ИХ ИЗБЕЖАТЬ НАДО ЕЩЁ ПАРУ ИФОВ ПРОПИСАТЬ ИЛИ СУЩЕСТВУЮЩИЕ УСЛОВИЯ ДОПОЛНИТЬ
  const startTimeSplited = startTime.split(':');
  const [startHours, startMinutes] = startTimeSplited;
  const endTimeSplited = endTime.split(':');
  const [endHours, endMinutes] = endTimeSplited;

  const getTimeSpent = (sh,sm,eh,em) => {
    let timeSpentHours, timeSpentMinutes, day = false;
    if (eh > sh) {
      timeSpentHours = eh - sh;
    };
    if (eh < sh) {
      // day = true;
      timeSpentHours = HOURS_IN_DAY - Number(sh) + Number(eh);
    };
    if (em > sm) {
      timeSpentMinutes = em - sm;
    };
    if (em < sm) {
      // day = true;
      timeSpentMinutes = MINUTES_IN_HOUR - Number(sm) + Number(em);
      timeSpentHours -= 1;
    };
    if (sh === eh) {
      timeSpentHours = 0;
    }
    if (sm === em) {
      timeSpentMinutes = 0;
    }
    return `${timeSpentHours}H ${timeSpentMinutes}M`
  };

  return `
    <li class="trip-events__item">

      <div class="event">

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${typeDict[type]}${separator}${planned}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">${endTime}</time>
          </p>
          <p class="event__duration">${getTimeSpent(startHours, startMinutes, endHours, endMinutes)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">

            <li class="event__offer">
              <span class="event__offer-title">${offer}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
            </li>

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </div>

    </li>
  `;
};

export {createEvent};