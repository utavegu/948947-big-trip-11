import DayComponent from "../components/day.js";
import SortingComponent from "../components/sorting.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import NoPointsComponent from "../components/no-points.js";
import {EVENT_COUNT, SortType} from "../const.js";
import {render, RenderPosition, replace} from "../utils/render.js";

/*
Задача контроллера создавать компоненты, добавлять их на страницу, навешивать обработчики. То есть реализовывать бизнес-логику и поведение приложения.
*/

// ФУНКЦИЯ ОТРИСОВКИ ОДНОЙ ТОЧКИ МАРШРУТА
const renderEvent = (container, event) => {

  const eventComponent = new EventComponent(event); // компонент события
  const eventEditComponent = new EventEditComponent(event); // форма редактирования

  // Поменять ивент на эдит
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  // Поменять эдит на ивент
  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
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

  render(container, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const eventsCopy = events.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedEvents = eventsCopy.sort((a, b) => a.interval.endDate.getTime() - b.interval.endDate.getTime());
      break;
    case SortType.TIME:
      sortedEvents = eventsCopy.sort((a, b) => a.interval.timeSpent - b.interval.timeSpent);
      break;
    case SortType.PRICE:
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


export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new NoPointsComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(events) {

    const container = this._container;

    render(container, this._sortingComponent.getElement(), RenderPosition.BEFOREEND);

    const sortedEventsInsideDay = getSortedEvents(events, SortType.DEFAULT);
    const dateOfDays = getDayInfo(events);

    for (let i = 0; i < dateOfDays.length; i++) {
      render(container, new DayComponent(dateOfDays[i], i).getElement(), RenderPosition.BEFOREEND);
      const tripEventList = document.querySelector(`.trip-events__list--${i}`);

      for (let j = 0; j < EVENT_COUNT; j++) {
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
        const commonDay = new DayComponent(``, ``).getElement();
        // Нашёл его контейнер с информацией
        const dayInfo = commonDay.querySelector(`.day__info`);
        // И сделал его невидимым
        dayInfo.style = `visibility: hidden;`;
        // Отрендерил в общий контейнер новый день
        render(container, commonDay, RenderPosition.BEFOREEND);
        // Нашёл контейнер под события
        const tripEventList = document.querySelector(`.trip-events__list`);
        // Очистил его
        tripEventList.innerHTML = ``;
        // И напихал туда отсортированных ивентов
        for (let j = 0; j < EVENT_COUNT; j++) {
          renderEvent(tripEventList, sortedEventsAll[j]);
        }
      } if (sortType === `default`) {

        const lonelyDay = container.querySelector(`.trip-days`);
        lonelyDay.remove();

        const sortedEventsInsideDay = getSortedEvents(events, sortType); // Да, согласен, оптимизация хромает
        const dateOfDays = getDayInfo(events); // Аналогично - no shadows

        for (let i = 0; i < dateOfDays.length; i++) {
          render(container, new DayComponent(dateOfDays[i], i).getElement(), RenderPosition.BEFOREEND);
          const tripEventList = document.querySelector(`.trip-events__list--${i}`);

          for (let j = 0; j < EVENT_COUNT; j++) {
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
      render(container, this._noPointComponent.getElement(), RenderPosition.BEFOREEND);
    }

  }
}
