import {createMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createSort} from "./components/sort.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";
import {createEditEvent} from "./components/event-edit.js";

import {generateEvents} from "./mock/waypoint.js";

/*
НАСТАВНИКУ:
В общем-то большую часть проблем я тут осознаю - что не всё в тех модулях, каких надо (марафетом займусь, когда всё заработает
  как надо); что функции можно универсализировать побольше... Но вот чего я понять совсем не могу:
  1) Какая-такая структура нужна для тасков. И что за отношения у с типом данных. Пожалуй я бы даже был бы признателен за 
  сразу готовую структуру.
  2) Как быть с датами в обоих случаях. Я подозреваю, что можно как-то использовать объект Date, но мало очень про него знаю.
  3) Офферы у меня пока все в одном при эдите ивента... но это я решу...
  4) То, что я обозвал "сепаратором" (to и in - по какому принципу он должен подставляться?)
  5) Даже не берусь пока за даты в режиме эдит - там чото совсем сложно по-моему
  6) Так же похоже что-то надо шаманить с хтмл-атрибутом даты и с выпадающими опциями городов
  7) Про последний пункт задания, что касается дней и дат... тут я чото вообще выезжаю... был бы рад некоторому пояснению от вас
*/

const EVENT_COUNT = 3; // Количество событий

// Функция рендера
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`); // Главный контейнер хэдера
const tripControl = document.querySelector(`.trip-main__trip-controls`); // Контрол в хэдере
const eventContainer = document.querySelector(`.trip-events`); // Контейнер для событий и дней

const events = generateEvents(EVENT_COUNT);

render(tripControl, createMenu()); // Отрисовка меню
render(eventContainer, createSort(), `beforeend`); // Отрисовка сортировки
render(tripControl, createFilter(), `beforeend`); // Отрисовка фильтра
render(eventContainer, createDay(), `beforeend`); // Отрисовка дня

const tripEventList = document.querySelector(`.trip-events__list`); // Контейнер для событий (ЖИВЁТ ВНУТРИ ДНЯ)

events.forEach((event) => render(tripEventList, createEvent(event))); // Отрисовка событий

render(tripEventList, createEditEvent(events[0]), `beforeend`); // Отрисовка редактирования события