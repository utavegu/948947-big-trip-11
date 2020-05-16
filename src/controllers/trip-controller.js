import DayComponent from "../components/day.js";
import SortingComponent from "../components/sorting.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import NoPointsComponent from "../components/no-points.js";
import {EVENT_COUNT, sortBy} from "../const.js";
import {render, RenderPosition, replace} from "../utils/render.js";

/*
ЗАДАНИЕ:
  1) Заведите директорию для контроллеров. Например, /src/controllers. +

  2) Создайте класс TripController с конструктором и методом render. +

  3) Конструктор должен принимать container — элемент, в который контроллер будет всё отрисовывать.

  4) Перенесите из main.js в метод render всю логику по отрисовке точек маршрута, а также по навешиванию на них обработчиков. В качестве параметров метод render должен принимать данные для отрисовки — точки маршрута, все возможные дополнительные опции и пункты назначения.

  5) В main.js создайте экземпляр TripController, а затем вызовите у него метод render, передав в него данные.
*/

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



// СОРТИРОВКА СОБЫТИЙ ПО ДАТЕ ОКОНЧАНИЯ
const sortEventsInsideDay = (events) => {
  return events.sort(function (a, b) {
    return a.interval.endDate.getTime() - b.interval.endDate.getTime();
  });
};



// Вытаскивание дня и месяца из каждой точки маршрута
const getDayInfo = (events) => {
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
  return dateOfDays;
};



export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new NoPointsComponent();
    this._sortingComponent = new SortingComponent();
  }

  render(events) {

    const container = this._container; //.getElement();

    const sortedEvents = sortEventsInsideDay(events);

    const dateOfDays = getDayInfo(events);

    // ПОКА ТАК (сломается, если удалить все точки маршрута вручную)
    // (если ивентов нет)
    if (events.length === 0) {
      render(container, this._noPointComponent.getElement(), RenderPosition.BEFOREEND);
    }
    // ПЕРЕДЕЛАЙ ВОТ ТАК (а пока скопируй сюда как есть - это про отрисовку сообщения при отсутствии ивентов)
    /*
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }
    */

    render(container, this._sortingComponent.getElement(), RenderPosition.BEFOREEND);

    /* ПОКА НЕ ТРОГАЮ, НО ПОТОМ ПРИГОДИТСЯ
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
    */

    // Отрисовка отдельных дней и отсортированных точек маршрута в них
    for (let i = 0; i < dateOfDays.length; i++) {
      render(container, new DayComponent(dateOfDays[i], i).getElement(), RenderPosition.BEFOREEND);
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
  }
}
 
