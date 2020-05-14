import {EVENT_COUNT, sortBy} from "./const.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {generateEvents} from "./mock/waypoint.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortingComponent from "./components/sorting.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import NoPointsComponent from "./components/no-points.js";

const tripControl = document.querySelector(`.trip-main__trip-controls`);
const eventContainer = document.querySelector(`.trip-events`);

render(tripControl, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControl, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(eventContainer, new SortingComponent().getElement(), RenderPosition.BEFOREEND);

const events = generateEvents(EVENT_COUNT);

// ПОКА ТАК (сломается, если удалить все точки маршрута вручную)
if (events.length === 0) {
  render(eventContainer, new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
}

let dateOfDays = [];

for (const event of events) {
  dateOfDays.push(event.interval.startDate);
}

dateOfDays.sort(sortBy.ascending);

const intermediateDateOfDays = new Set();

for (const date of dateOfDays) {
  intermediateDateOfDays.add(date.getDate() + `-` + date.getMonth());
}

dateOfDays = Array.from(intermediateDateOfDays);


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


const sortEventsInsideDay = (tripEvents) => {
  return tripEvents.sort(function (a, b) {
    return a.interval.endDate.getTime() - b.interval.endDate.getTime();
  });
};

const sortedEvents = sortEventsInsideDay(events);

for (let i = 0; i < dateOfDays.length; i++) {
  render(eventContainer, new DayComponent(dateOfDays[i], i).getElement(), RenderPosition.BEFOREEND);
  const tripEventList = document.querySelector(`.trip-events__list--${i}`);

  for (let j = 0; j < EVENT_COUNT; j++) {
    const dayDate = dateOfDays[i].split(`-`)[0];
    const dayMonth = dateOfDays[i].split(`-`)[1];
    const eventDay = sortedEvents[j].interval.startDate.getDate();
    const eventMonth = sortedEvents[j].interval.startDate.getMonth();
    if ((dayDate === String(eventDay)) && (dayMonth === String(eventMonth))) {
      renderEvent(tripEventList, sortedEvents[j]);
    }
  }
}

