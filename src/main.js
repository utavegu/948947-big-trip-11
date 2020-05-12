import {EVENT_COUNT, sortBy} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
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

const renderEvent = (tripEventListParam, eventParam) => {

  const replaceEventToEdit = () => {
    tripEventListParam.replaceChild(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    tripEventListParam.replaceChild(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent(eventParam).getElement();

  const editButton = eventComponent.querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent(eventParam).getElement();
  eventEditComponent.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const rollUpButton = eventEditComponent.querySelector(`.event__rollup-btn`);
  rollUpButton.addEventListener(`click`, () => {
    replaceEditToEvent();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventListParam, eventComponent, RenderPosition.BEFOREEND);
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

