import {EVENT_COUNT} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateEvents} from "./mock/waypoint.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import TripController from "./controllers/trip-controller.js";

const tripControl = document.querySelector(`.trip-main__trip-controls`);
const eventContainer = document.querySelector(`.trip-events`);

render(tripControl, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControl, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const events = generateEvents(EVENT_COUNT);

const tripController = new TripController(eventContainer);
tripController.render(events);
