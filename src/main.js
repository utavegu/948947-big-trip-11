import {createRouteAndCost} from "./components/route-and-cost.js";
import {createMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createSort} from "./components/sort.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";
import {createEditEvent} from "./components/event-edit.js";

const EVENT_COUNT = 7; // Количество событий

// Функция рендера
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`); // Главный контейнер хэдера
const tripControl = document.querySelector(`.trip-main__trip-controls`); // Контрол в хэдере

const eventContainer = document.querySelector(`.trip-events`); // Контейнер для событий и дней


render(tripMain, createRouteAndCost()); // Отрисовка маршрута и стоимости
render(tripControl, createMenu()); // Отрисовка меню
render(eventContainer, createSort(), `beforeend`); // Отрисовка сортировки
render(tripControl, createFilter(), 'beforeend'); // Отрисовка фильтра
render(eventContainer, createDay(), `beforeend`); // Отрисовка дня


const tripEventList = document.querySelector(`.trip-events__list`); // Контейнер для событий (ЖИВЁТ ВНУТРИ ДНЯ)

Array(EVENT_COUNT).fill().forEach(() => render(tripEventList, createEvent())); // Отрисовка событий

render(tripEventList, createEditEvent(), `beforeend`); // Отрисовка редактирования события

/*
Михаилу.
Я маленько долбоёб. Только сейчас заметил подсказки в паблик индексе.
*/