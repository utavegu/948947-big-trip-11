/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/day.js":
/*!*******************************!*\
  !*** ./src/components/day.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Day; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const createDayTemplate = (date, number) => {

  const day = date.split(`-`)[0];
  const month = _const_js__WEBPACK_IMPORTED_MODULE_1__["MonthTranslator"][(date.split(`-`)[1])];

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

class Day extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/components/event-edit.js":
/*!**************************************!*\
  !*** ./src/components/event-edit.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEdit; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");



const createEventEditTemplate = (event) => {
  const offers = [];
  for (let i = 0; i < event.offers.length; i++) {
    if (i === 5) {
      break;
    }
    offers.push(`<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-TYPE-${event.offers[i]._randomChecker}" type="checkbox" name="event-offer-TYPE" checked>
              <label class="event__offer-label" for="event-offer-TYPE-${event.offers[i]._randomChecker}">
                <span class="event__offer-title">${event.offers[i].action}</span>
                &plus; &euro;&nbsp;
                <span class="event__offer-price">${event.offers[i].price}</span>
              </label>
            </div>`);
  }
  const offersElements = offers.join(`<br><br>`);
  const eventStartTime = `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.startDate.getDate())}/${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(Number(event.interval.startDate.getMonth()) + 1)}/${String(event.interval.startDate.getFullYear()).substr(2)} ${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.startDate.getHours())}:${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.startDate.getMinutes())}`;
  const eventEndTime = `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.endDate.getDate())}/${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(Number(event.interval.endDate.getMonth()) + 1)}/${String(event.interval.endDate.getFullYear()).substr(2)} ${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.endDate.getHours())}:${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["castTimeFormat"])(event.interval.endDate.getMinutes())}`;

  return `<form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.name}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${event.type.name}${event.type.preposition}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Мытищи"></option>
          <option value="Урюпинск"></option>
          <option value="Елабуга"></option>
          <option value="Тумтук"></option>
          <option value="Кандрыкуль"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">

        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>

        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime}">
        &mdash;

        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>

        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>

      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>

    </header>

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">

          ${offersElements}

        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${event.phrase}
        </p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${event.photo}
          </div>
        </div>

      </section>

    </section>
  </form>`;
};

class EventEdit extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setCloseFormButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

}


/***/ }),

/***/ "./src/components/event.js":
/*!*********************************!*\
  !*** ./src/components/event.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Event; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");




const createEventTemplate = (event) => {
  const offers = [];
  for (let i = 0; i < event.offers.length; i++) {
    if (i === 3) {
      break;
    }
    offers.push(`<li class="event__offer">
    <span class="event__offer-title">${event.offers[i].action}</span>
    &plus; &euro;&nbsp;
    <span class="event__offer-price">${event.offers[i].price}</span>
    </li>`);
  }
  const offersElements = offers.join(`<br><br>`);
  const eventTitle = `${event.type.name}${event.type.preposition}${event.city}`;
  const eventStartTime = `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_2__["castTimeFormat"])(event.interval.startDate.getHours())}:${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_2__["castTimeFormat"])(event.interval.startDate.getMinutes())}`;
  const eventEndTime = `${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_2__["castTimeFormat"])(event.interval.endDate.getHours())}:${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_2__["castTimeFormat"])(event.interval.endDate.getMinutes())}`;
  const eventDuration = `${Math.trunc(event.interval.timeSpent / _const_js__WEBPACK_IMPORTED_MODULE_1__["msTranslator"].MS_IN_DAY)}D ${Math.trunc((event.interval.timeSpent / _const_js__WEBPACK_IMPORTED_MODULE_1__["msTranslator"].MS_IN_HOUR) % 24)}H ${Math.trunc(event.interval.timeSpent / _const_js__WEBPACK_IMPORTED_MODULE_1__["msTranslator"].MS_IN_MIN % 60)}M`;

  return `<li class="trip-events__item">
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
        ${offersElements}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

class Event extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

}



/***/ }),

/***/ "./src/components/no-points.js":
/*!*************************************!*\
  !*** ./src/components/no-points.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoPoints; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createNoPointsTemplate = () => {
  return `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`;
};

class NoPoints extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createNoPointsTemplate();
  }
}


/***/ }),

/***/ "./src/components/sorting.js":
/*!***********************************!*\
  !*** ./src/components/sorting.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sorting; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const createSortingTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event" data-sort-type="default">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time" data-sort-type="by-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price" data-sort-type="by-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
};

class Sorting extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._currenSortType = _const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DEFAULT;
    this.resetSortType = this.resetSortType.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  resetSortType() {
    this._currenSortType = _const_js__WEBPACK_IMPORTED_MODULE_1__["SortType"].DEFAULT;
    this.getElement().querySelector(`#sort-event`).checked = true;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const sortItem = evt.target.closest(`.trip-sort__item`);
      if (!sortItem) {
        return;
      }
      const sortType = evt.target.dataset.sortType;
      if (this._currenSortType === sortType) {
        return;
      }
      this._currenSortType = sortType;
      const sortInput = sortItem.querySelector(`.trip-sort__input`);
      if (sortInput) {
        sortInput.checked = true;
      }
      handler(this._currenSortType);
    });
  }

}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, MonthTranslator, SortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_COUNT", function() { return EVENT_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFERS_ACTIONS", function() { return OFFERS_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CITIES", function() { return CITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOfPhrases", function() { return setOfPhrases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventType", function() { return eventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msTranslator", function() { return msTranslator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthTranslator", function() { return MonthTranslator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
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

const SortType = {
  DEFAULT: `default`,
  TIME: `by-time`,
  PRICE: `by-price`
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




/***/ }),

/***/ "./src/controllers/trip-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/trip-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TripController; });
/* harmony import */ var _components_day_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/day.js */ "./src/components/day.js");
/* harmony import */ var _components_sorting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/sorting.js */ "./src/components/sorting.js");
/* harmony import */ var _components_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/event.js */ "./src/components/event.js");
/* harmony import */ var _components_event_edit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/event-edit.js */ "./src/components/event-edit.js");
/* harmony import */ var _components_no_points_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/no-points.js */ "./src/components/no-points.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");








/*
Задача контроллера создавать компоненты, добавлять их на страницу, навешивать обработчики. То есть реализовывать бизнес-логику и поведение приложения.
*/

// ФУНКЦИЯ ОТРИСОВКИ ОДНОЙ ТОЧКИ МАРШРУТА
const renderEvent = (container, event) => {

  const eventComponent = new _components_event_js__WEBPACK_IMPORTED_MODULE_2__["default"](event); // компонент события
  const eventEditComponent = new _components_event_edit_js__WEBPACK_IMPORTED_MODULE_3__["default"](event); // форма редактирования

  // Поменять ивент на эдит
  const replaceEventToEdit = () => {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["replace"])(eventEditComponent, eventComponent);
  };

  // Поменять эдит на ивент
  const replaceEditToEvent = () => {
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["replace"])(eventComponent, eventEditComponent);
  };

  // Реакция на нажатие Эскейпа
  // РАЗБЕРИСЬ С ЕВТ КЕЙ
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  // Обработчик клика на кнопку редактирования
  const onEditButtonClick = () => {
    replaceEventToEdit(); // Поменял ивент на эдит
    document.addEventListener(`keydown`, onEscKeyDown); // Повесил слушатель эскейпа
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault(); // Чтоб форма не отправлялась
    replaceEditToEvent(); // Поменял эдит на ивент
    document.removeEventListener(`keydown`, onEscKeyDown); // Удалил слушатель эскейпа
  };

  const onCloseFormButtonClick = () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  // Слушатель на кнопке "edit" (галочка вниз)
  eventComponent.setEditButtonClickHandler(onEditButtonClick);

  // Слушатель на кнопке Save
  eventEditComponent.setSubmitHandler(onFormSubmit);

  // Слушатель на кнопке закрытия редактирования (галочка вверх)
  eventEditComponent.setCloseFormButtonClickHandler(onCloseFormButtonClick);

  Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, eventComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
};


const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const eventsCopy = events.slice();

  switch (sortType) {
    case _const_js__WEBPACK_IMPORTED_MODULE_5__["SortType"].DEFAULT:
      sortedEvents = eventsCopy.sort((a, b) => a.interval.endDate.getTime() - b.interval.endDate.getTime());
      break;
    case _const_js__WEBPACK_IMPORTED_MODULE_5__["SortType"].TIME:
      sortedEvents = eventsCopy.sort((a, b) => a.interval.timeSpent - b.interval.timeSpent);
      break;
    case _const_js__WEBPACK_IMPORTED_MODULE_5__["SortType"].PRICE:
      sortedEvents = eventsCopy.sort((a, b) => a.price - b.price);
      break;
  }
  return sortedEvents;
};


// Вытаскивание дня и месяца из каждой точки маршрута
const getDayInfo = (events) => {
  let dateOfDays = [];
  for (const event of events) {
    dateOfDays.push(event.interval.startDate);
  }
  dateOfDays.sort((a, b) => a - b);
  const intermediateDateOfDays = new Set();
  for (const date of dateOfDays) {
    intermediateDateOfDays.add(date.getDate() + `-` + date.getMonth());
  }
  dateOfDays = Array.from(intermediateDateOfDays);
  return dateOfDays;
};


class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new _components_no_points_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this._sortingComponent = new _components_sorting_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  render(events) {

    const container = this._container;

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, this._sortingComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);

    const sortedEventsInsideDay = getSortedEvents(events, _const_js__WEBPACK_IMPORTED_MODULE_5__["SortType"].DEFAULT);
    const dateOfDays = getDayInfo(events);

    for (let i = 0; i < dateOfDays.length; i++) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, new _components_day_js__WEBPACK_IMPORTED_MODULE_0__["default"](dateOfDays[i], i).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
      const tripEventList = document.querySelector(`.trip-events__list--${i}`);

      for (let j = 0; j < _const_js__WEBPACK_IMPORTED_MODULE_5__["EVENT_COUNT"]; j++) {
        const dayDate = dateOfDays[i].split(`-`)[0];
        const dayMonth = dateOfDays[i].split(`-`)[1];
        const eventDay = sortedEventsInsideDay[j].interval.startDate.getDate();
        const eventMonth = sortedEventsInsideDay[j].interval.startDate.getMonth();
        if ((dayDate === String(eventDay)) && (dayMonth === String(eventMonth))) {
          renderEvent(tripEventList, sortedEventsInsideDay[j]);
        }
      }
    }


    // ОПТИМИЗАЦИЯ ТУТ НЕ НОЧЕВАЛА, НО Я СЛИШКОМ ЗАДОЛБАЛСЯ ТЕБЯ ДЕЛАТЬ
    const onSortTypeChange = (sortType) => {
      if (sortType === `by-time` || sortType === `by-price`) {

        // Нашёл все контейнеры дней:
        const allDays = container.querySelectorAll(`.trip-days`);
        // И перебором грохнул каждый из них:
        allDays.forEach(element => element.remove()); // я хз чо те надо, замысел именно такой и всё работает, потом разберусь с тобой
        // Отсортировал ивенты по нужному типу и сунул их в переменную:
        const sortedEventsAll = getSortedEvents(events, sortType);
        // Создал один день:
        const commonDay = new _components_day_js__WEBPACK_IMPORTED_MODULE_0__["default"](``, ``).getElement();
        // Нашёл его контейнер с информацией
        const dayInfo = commonDay.querySelector(`.day__info`);
        // И сделал его невидимым
        dayInfo.style = `visibility: hidden;`;
        // Отрендерил в общий контейнер новый день
        Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, commonDay, _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
        // Нашёл контейнер под события
        const tripEventList = document.querySelector(`.trip-events__list`);
        // Очистил его
        tripEventList.innerHTML = ``;
        // И напихал туда отсортированных ивентов
        for (let j = 0; j < _const_js__WEBPACK_IMPORTED_MODULE_5__["EVENT_COUNT"]; j++) {
          renderEvent(tripEventList, sortedEventsAll[j]);
        }
      } if (sortType === `default`) {

        const lonelyDay = container.querySelector(`.trip-days`);
        lonelyDay.remove();

        const sortedEventsInsideDay = getSortedEvents(events, sortType); // Да, согласен, оптимизация хромает
        const dateOfDays = getDayInfo(events); // Аналогично - no shadows

        for (let i = 0; i < dateOfDays.length; i++) {
          Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, new _components_day_js__WEBPACK_IMPORTED_MODULE_0__["default"](dateOfDays[i], i).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
          const tripEventList = document.querySelector(`.trip-events__list--${i}`);

          for (let j = 0; j < _const_js__WEBPACK_IMPORTED_MODULE_5__["EVENT_COUNT"]; j++) {
            const dayDate = dateOfDays[i].split(`-`)[0];
            const dayMonth = dateOfDays[i].split(`-`)[1];
            const eventDay = sortedEventsInsideDay[j].interval.startDate.getDate();
            const eventMonth = sortedEventsInsideDay[j].interval.startDate.getMonth();
            if ((dayDate === String(eventDay)) && (dayMonth === String(eventMonth))) {
              renderEvent(tripEventList, sortedEventsInsideDay[j]);
            }
          }
        }
      }
    };

    this._sortingComponent.setSortTypeChangeHandler(onSortTypeChange);

    const tripDays = document.querySelectorAll(`.trip-days`);
    if (!tripDays.length) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, this._noPointComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_6__["RenderPosition"].BEFOREEND);
    }

  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");
/* harmony import */ var _mock_waypoint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock/waypoint.js */ "./src/mock/waypoint.js");
/* harmony import */ var _controllers_trip_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/trip-controller.js */ "./src/controllers/trip-controller.js");

// import {render, RenderPosition} from "./utils/render.js";

// import MenuComponent from "./components/menu.js";
// import FilterComponent from "./components/filter.js";


// const tripControl = document.querySelector(`.trip-main__trip-controls`);
const eventContainer = document.querySelector(`.trip-events`);

// render(tripControl, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
// render(tripControl, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const events = Object(_mock_waypoint_js__WEBPACK_IMPORTED_MODULE_1__["generateEvents"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["EVENT_COUNT"]);

const tripController = new _controllers_trip_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"](eventContainer);
tripController.render(events);


/***/ }),

/***/ "./src/mock/waypoint.js":
/*!******************************!*\
  !*** ./src/mock/waypoint.js ***!
  \******************************/
/*! exports provided: generateEvent, generateEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEvent", function() { return generateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEvents", function() { return generateEvents; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");



// ЗАФИГАРЬ КОНСТАНТЫ ДЛЯ МОКОВ В ПАПКЕ МОКИ (чтобы убрать магические числа)

const generateOffer = () => {
  return {
    action: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomArrayItem"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["OFFERS_ACTIONS"]),
    price: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(0, 101),
    type: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomArrayItem"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["eventType"]),
    _randomChecker: Math.trunc(Math.random() * 10000),
  };
};

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(0, 6); i++) {
    offers.push(generateOffer());
  }
  return offers;
};

const generateRandomPhoto = () => {
  const photoElement = `<img class="event__photo" src="./img/photos/${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(1, 38)}.jpg" alt="Какая-то фотка"></img>`;
  return photoElement;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

const generateRandomInterval = () => {
  const startDate = getRandomDate();
  const endDate = new Date(startDate);
  const randomInterim = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["msTranslator"].MS_IN_HOUR, (_const_js__WEBPACK_IMPORTED_MODULE_0__["msTranslator"].MS_IN_DAY) * 3);
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
    type: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomArrayItem"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["eventType"]),
    city: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomArrayItem"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["CITIES"]),
    price: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInteger"])(0, 501),
    offers: generateOffers(),
    phrase: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["fillData"])(_const_js__WEBPACK_IMPORTED_MODULE_0__["setOfPhrases"], 1, 6, `. `),
    photo: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_1__["fillData"])(generateRandomPhoto, 1, 6),
    interval: generateRandomInterval(),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

/* --- */




/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: getRandomInteger, getRandomArrayItem, castTimeFormat, fillData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castTimeFormat", function() { return castTimeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillData", function() { return fillData; });
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




/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: RenderPosition, createElement, render, replace, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map