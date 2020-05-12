import AbstractComponent from "./abstract-component.js";
import {MonthTranslator} from "../const.js";

const createDayTemplate = (date, number) => {

  const day = date.split(`-`)[0];
  const month = MonthTranslator[(date.split(`-`)[1])];

  return `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number + 1}</span>
          <time class="day__date" datetime="2020-03-18">${month} ${day}</time>
        </div>
        <ul class="trip-events__list trip-events__list--${number}">
        </ul>
      </li>
  </ul>`;
};

export default class Day extends AbstractComponent {
  constructor(date, orderNumber) {
    super();

    this._date = date;
    this._orderNumber = orderNumber;
    // this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._orderNumber);
  }
}
