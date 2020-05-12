const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/*
const OLDrender = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
  КОРОЧЕ ПОГУГЛИ РАЗНИЦУ ИНСЕРТАДЖАСЕНТА И АППЕНДА-ПРЕПЕНДА И ГРОХНИ ЭТОТ БЛОК
};
*/

export {RenderPosition, createElement, render};
