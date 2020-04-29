import {createElement} from "../util.js";

const createDayTemplate = (date, number) => {

  // ПЕРЕНЕСТИ В КОНСТАНТЫ
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
  }

  const day = date.getDate();
  const month = MonthTranslator[date.getMonth()];


  // что-то мне подсказывает, что в атрибуте datetime тоже надо бы циферки поменять
  return `
    <ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number+1}</span>
          <time class="day__date" datetime="2019-03-18">${month} ${day}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>
    </ul>
  `;
};

export default class Day {
  constructor(date, orderNumber) {
    this._date = date;
    this._orderNumber = orderNumber;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._orderNumber);
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