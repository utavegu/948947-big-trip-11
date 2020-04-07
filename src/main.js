import {createMenuTemplate} from "./components/menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createDayTemplate} from "./components/day.js";
import {createEventTemplate} from "./components/event.js";
import {createEditEventTemplate} from "./components/event-edit.js";

const EVENT_COUNT = 3; // Количество событий

// Функция рендера
const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

document.querySelector(`.trip-main__event-add-btn`).remove(); // Костыль для убирания злой кнопки


const headerContainer = document.querySelector(`.trip-main`); // Контейнер хэдера
const eventContainer = document.querySelector(`.trip-events`); // Контейнер для событий и дней

render(headerContainer, createMenuTemplate()); // Отрисовка меню
render(eventContainer, createSortTemplate()); // Отрисовка сортировки
render(eventContainer, createDayTemplate(), `beforeend`); // Отрисовка дня

const tripEventList = document.querySelector(`.trip-events__list`); // Контейнер для событий (ЖИВЁТ ВНУТРИ ДНЯ)

const events = []; // Коллекция событий

// Рендер событий
for (let i = 0; i < EVENT_COUNT; i++) {
  events.push(createEventTemplate());
}

events.forEach(() => render(tripEventList, createEventTemplate())); // Отрисовка событий

render(tripEventList, createEditEventTemplate(), `beforeend`); // Отрисовка редактирования события

/*
НАСТАВНИКУ:
1) Всё-таки мне кажется, что такое решение проблем с кнопкой не очень корректно. Но иначе у меня не получилось отрисовать как надо.
2) А ещё похоже я часть разметки просрал, не знаю на сколько это критично - вроде всё показывает
3) Ну и компонент "день" меня никто делать не просил, но это полноценная сущность и ей надо быть, имхо
*/
