import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import {generateEvents} from "./mock/waypoint.js";
import {EVENT_COUNT, sortBy} from "./const.js";
import {render, RenderPosition} from "./util.js";

const tripControl = document.querySelector(`.trip-main__trip-controls`);
const eventContainer = document.querySelector(`.trip-events`);

// TO DO ВОПРОС НАСТАВНИКУ: Тут и в других рендерах - почему-то у меня не получилось решить задачу без .nextElementSibling. Не смотря на то, что в Таскманагере код абсолютно аналогичный - там почему-то работает, а тут нет. Нифига не понял.
render(tripControl, new MenuComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);
render(tripControl, new FilterComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);
render(eventContainer, new SortComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);

const events = generateEvents(EVENT_COUNT);

// TO DO WIP от
const dateOfDays = [];
for (const event of events) {
  dateOfDays.push(event.interval.startDate);
}
dateOfDays.sort(sortBy.ascending);
const dateOfDaysSET = new Set();
for (const event of dateOfDays) {
  dateOfDaysSET.add(event.getDate() + `-` + event.getMonth());
}
const dateOfDaysARRAY = Array.from(dateOfDaysSET);
// до

const renderEvent = (tripEventListParam, eventParam) => {

  const onEditButtonClick = () => {
    tripEventListParam.replaceChild(eventEditComponent, eventComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    tripEventListParam.replaceChild(eventComponent, eventEditComponent);
  };

  const eventComponent = new EventComponent(eventParam).getElement().nextElementSibling;
  const editButton = eventComponent.querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const eventEditComponent = new EventEditComponent(eventParam).getElement().nextElementSibling;
  eventEditComponent.addEventListener(`submit`, onEditFormSubmit);

  render(tripEventListParam, eventComponent, RenderPosition.BEFOREEND);
};

for (let i = 0; i < dateOfDaysARRAY.length; i++) {
  render(eventContainer, new DayComponent(dateOfDaysARRAY[i], i).getElement().nextElementSibling, RenderPosition.BEFOREEND);
  const tripEventList = document.querySelector(`.trip-events__list--${i}`);

  for (let j = 0; j < EVENT_COUNT; j++) {
    const dayDate = dateOfDaysARRAY[i].split(`-`)[0];
    const dayMonth = dateOfDaysARRAY[i].split(`-`)[1];
    const eventDay = events[j].interval.startDate.getDate();
    const eventMonth = events[j].interval.startDate.getMonth();
    if ((dayDate == eventDay) && (dayMonth == eventMonth)) { // TO DO WIP
      renderEvent(tripEventList, events[j]);
    }
  }
}

