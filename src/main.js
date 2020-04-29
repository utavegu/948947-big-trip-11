import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import {generateEvent, generateEvents} from "./mock/waypoint.js";
import {EVENT_COUNT} from "./const.js";
import {render, RenderPosition} from "./util.js";

/*
МИХАИЛУ:
ЭТО ЧЕРНОВИК - тут в первую очередь обращайте внимание на мои комментарии. На всё подряд - пока не нужно.
Смысл этого пуллреквеста - получить от вас советы, помощь, по тем моментам, на которых я застрял. Или которые мне не особо понятны.
Линтером тоже, разумеется, ещё не шерстил. А ещё, традиционно для этого интенсива, забыл поменять ветку в начале.
Часть комментариев я оставил для себя, часть - это цитаты вас, для будущих правок, когда буду в проекте марафет наводить. Все остальные непонятные мне моменты я хорошо описал и вы встретите их в комментариях в процессе ревью.
Кстати, критерии прочесть у меня до сих пор руки не дошли, но ко второй проверке этого задания - обещаю прочесть и исправить всё по ним, что замечу.
*/

// const tripMain = document.querySelector(`.trip-main`); // Главный контейнер хэдера... Может ещё пригодишься
const tripControl = document.querySelector(`.trip-main__trip-controls`); // Контрол в хэдере
const eventContainer = document.querySelector(`.trip-events`); // Контейнер для событий и дней

// Тут и в других рендерах - почему-то у меня не получилось решить задачу без .nextElementSibling. Не смотря на то, что в Таскманагере код абсолютно аналогичный - там почему-то работает, а тут нет. Нифига не понял.
render(tripControl, new MenuComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);
render(tripControl, new FilterComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);
render(eventContainer, new SortComponent().getElement().nextElementSibling, RenderPosition.BEFOREEND);

/*
Вот отсюда и ниже - работа над моей главной проблемой уже 2 модуля как. На данном этапе 2 проблемы остались не решенными:
1) dateOfDays нужно как-то избавить от повторяющихся значений. Но сделать это так, чтобы алгоритм чистки массива от неуникальных значений работал не со всей датой целиком (секунды, минуты и часы не интересны), а смотрел только на день, месяц и год. И удалял все повторяющиеся элементы по этим трём критериям. Как это реализовать - мыслей у меня нет. Это главная проблема в решении этой задачи.
2) После того, как пункт 1 будет реализован - через двойной цикл загнать в контейнеры дня КомпонентыТочекМаршрута. С этой задачей, я надеюсь, что справлюсь сам
*/
const events = generateEvents(EVENT_COUNT);
const dateOfDays = []; // так-то можно было напрямую с данными объекта работать... но пока так
for (event of events) {
  dateOfDays.push(event.interval.startDate);
};
// В КОНСТАНТЫ - в объект sortBy
const ascending = function(a,b){ 
  return a - b 
};
// Хотя не, тут-то мне массив и пригодился, ибо метод деструктивный, а исходные данные мне ещё пригодятся
dateOfDays.sort(ascending);

for (let i = 0; i < dateOfDays.length; i++) {
  render(eventContainer, new DayComponent(dateOfDays[i], i).getElement().nextElementSibling, RenderPosition.BEFOREEND);
}
const tripEventList = document.querySelector(`.trip-events__list`); // Контейнер для событий (ЖИВЁТ ВНУТРИ ДНЯ)

// Он там как-то по-особому отображаться должен, но предлагаю пока не заострять на этом внимание
render(tripEventList, new EventEditComponent(generateEvent()).getElement().nextElementSibling, RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventList, new EventComponent(generateEvent()).getElement().nextElementSibling, RenderPosition.BEFOREEND);
}





// Ниже - это касается выполнения второй части задания модуля 4. Я ещё вплотную его не нюхал, потому пока никаких вопросов нет
// ТУТ ПОКА В ПРОЦЕССЕ, ВООБШЕ НЕ СМОТРИТЕ СЮДА
/*
const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount)
  .forEach((task) => {
    renderTask(taskListElement, task);
  });

tasks.slice(prevTasksCount, showingTasksCount)
  .forEach((task) => renderTask(taskListElement, task));
*/
