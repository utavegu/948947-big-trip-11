import {EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, typeTranslator} from "../const.js";
import {getRandomIntegerNumber, getRandomArrayItem, castTimeFormat, fillAnArray_VER2} from "../util.js";

// Разметка события
const createEvent = (event) => {

  // Вот тут, и в эвент-эдите тоже, по части рефакторинга можно было сделать что - все преобразования сначала провести тут, положив их в переменную, а не городить их прямо в коде ниже.

  return `
    <li class="trip-events__item">

      <div class="event">

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.name}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${typeTranslator[event.type.name]}${event.type.pretext}${event.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">${castTimeFormat(event.startDate.getHours())}:${castTimeFormat(event.startDate.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">${castTimeFormat(event.endDate.getHours())}:${castTimeFormat(event.endDate.getMinutes())}</time>
          </p>
          <p class="event__duration">${Math.trunc(event.timeSpent/msTranslator.day)}D ${Math.trunc((event.timeSpent/msTranslator.hour)%24)}H ${Math.trunc(event.timeSpent/msTranslator.min%60)}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          
          ${event.offersElement1}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </div>

    </li>
  `;
};

export {createEvent};