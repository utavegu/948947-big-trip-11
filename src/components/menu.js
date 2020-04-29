import {createElement} from "../util.js";

const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  `;
};

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  // Тут и любой другой класс - я не понимаю смысл этого метода и то, когда его нужно применять (1-2 примера мне бы в этом помогли)
  removeElement() {
    this._element = null;
  }
}
