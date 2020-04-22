import {createMenu} from "./components/menu.js";
import {createFilter} from "./components/filter.js";
import {createSort} from "./components/sort.js";
import {createDay} from "./components/day.js";
import {createEvent} from "./components/event.js";
import {createEditEvent} from "./components/event-edit.js";

import {generateEvents} from "./mock/waypoint.js";
import {EVENT_COUNT} from "./const.js";

/*
НАСТАВНИКУ:
1) Не стал избавляться от магических числах в генераторах моков, чтобы не создавать путанницу, не засорять константы и не делать лишнюю работу
2) Единственное, до чего я своим умом никак не смог додуматься, это как выполнить вот этот пункт задания:
  8. В заключении распределите точки маршрута в списке согласно дате. Обратите внимание на вёрстку, для каждого дня путешествия заведён отдельный контейнер с порядковым номером. И в этот контейнер отрисовываются точки маршрута, соответствующие этой дате.
  И даже не смотря на вашу подсказку:
  "все просто. У тебя есть день, внутри него есть точки маршрута. сначала прилет, потом заселение, потом поход по музеям или наоборот - зависит от указанной в точке времени - вот по нему и надо отсортировать. Сначала более ранние."
  Это-то понятно - не понятно как это с технической точки зрения должно быть реализовано. На словах я могу описать это так:
  Дней столько, сколько разных дат. Под каждую дату создаётся новый "день". Внутри дня даты расположены по времени.
  Но как это сделать я что-то совсем не пойму.
3) Остальное в попутных комментариях
*/

// Функция рендера
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

// const tripMain = document.querySelector(`.trip-main`); // Главный контейнер хэдера
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

render(tripEventList, createEditEvent(events[events.length - 1]), `beforeend`); // Отрисовка редактирования события

