import {createMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createSort} from "./components/sort.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";
import {createEditEvent} from "./components/event-edit.js";

import {generateEvents} from "./mock/waypoint.js";
import {EVENT_COUNT, OFFERS_ACTIONS, CITIES, setOfPhrases, eventType, msTranslator, typeTranslator} from "./const.js";
import {getRandomIntegerNumber, getRandomArrayItem, castTimeFormat, fillAnArray_VER2} from "./util.js";

// НЕ ЗАБУДЬ ПОТОМ ВЫЧИСТИТЬ ВСЕ НЕИСПОЛЬЗУЕМЫЕ НО ИМПОРТНУТЫЕ КОНСТАНТЫ И УТИЛИ

// Функция рендера
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`); // Главный контейнер хэдера
const tripControl = document.querySelector(`.trip-main__trip-controls`); // Контрол в хэдере
const eventContainer = document.querySelector(`.trip-events`); // Контейнер для событий и дней

render(tripControl, createMenu()); // Отрисовка меню
render(eventContainer, createSort(), `beforeend`); // Отрисовка сортировки
render(tripControl, createFilter(), `beforeend`); // Отрисовка фильтра
render(eventContainer, createDay(), `beforeend`); // Отрисовка дня

const tripEventList = document.querySelector(`.trip-events__list`); // Контейнер для событий (ЖИВЁТ ВНУТРИ ДНЯ)

// Вот тут я массив объектов получил из файла waypoints.js
const events = generateEvents(EVENT_COUNT);

// А вот тут по одному объекту закидываю в файл event.js
events.forEach((event) => render(tripEventList, createEvent(event)));

render(tripEventList, createEditEvent(events[events.length-1]), `beforeend`); // Отрисовка редактирования события

