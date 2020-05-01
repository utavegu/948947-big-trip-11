import {msTranslator} from "../const.js";
import {castTimeFormat, createElement} from "../util.js";

const createEventTemplate = (event) => {

  const eventTitle = `${event.type.name}${event.type.preposition}${event.city}`;
  const eventStartTime = `${castTimeFormat(event.interval.startDate.getHours())}:${castTimeFormat(event.interval.startDate.getMinutes())}`;
  const eventEndTime = `${castTimeFormat(event.interval.endDate.getHours())}:${castTimeFormat(event.interval.endDate.getMinutes())}`;
  const eventDuration = `${Math.trunc(event.interval.timeSpent / msTranslator.MS_IN_DAY)}D ${Math.trunc((event.interval.timeSpent / msTranslator.MS_IN_HOUR) % 24)}H ${Math.trunc(event.interval.timeSpent / msTranslator.MS_IN_MIN % 60)}M`;

  return `
    <li class="trip-events__item">

      <div class="event">

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.name}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${eventTitle}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T12:25">${eventStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T13:35">${eventEndTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          
          ${event.offersElement}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>

      </div>

    </li>
  `;
};

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
