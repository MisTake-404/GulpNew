import accordionsConfig from "./configs/accordionsConfig.js";
import slidersConfig from "./configs/slidersConfig.js";
import devModules from "./modules/development/index.js";
import { allModules } from "./modules/init.js";

window.onload = () => {
  const modules = allModules;
  const [Route, Routes] = modules.Router();
  
  /* Все DOM элементы */
  const _DOM = {
    selects: document.querySelectorAll('.wrapper-select__select'),
    anchors: document.querySelectorAll('.testanchor'),
    modal: {
      modals: document.querySelectorAll('[data-modal]'),
      buttons: document.querySelectorAll('[data-open-modal]'),
    },
    fixed: {
      circle: document.querySelector('.circle'),
    },
    preloader: document.querySelector('.preloader'),
  };


  /* Табы */
  const tabs = () => {
    const tab = modules.ItcTabs;

    new tab('.tabs');
  }

  /* Аккордионы */
  const accordions = () => {
    modules.accordion('.accordion', accordionsConfig.example);
  }

  /* Слайдеры */
  const sliders = () => {
    modules.swiper('.swiper', slidersConfig.example);
  }

  /* Фиксированные элементы */
  const fixedElements = () => {
    modules.fixedElement(_DOM.fixed.circle, _DOM.fixed.circle.getBoundingClientRect().height, 'fixed');
  } 

  /* Инициализация модулей. Страница: index.html */
  Route('/', (page) => {
    modules.anchors(_DOM.anchors, -25);
  }); 

  /* Инициализация модулей. Страница: example.html */
  Route('example', (page) => {
    modules.selects(_DOM.selects);
    modules.anchors(_DOM.anchors, -25);
    modules.isLinkActive(_DOM.anchors, 'active', true, 0);
    modules.modal(_DOM.modal.modals, _DOM.modal.buttons);
    modules.ajaxForms('[data-form]', '[data-submit]', '/email.php', true, '/thanks');
    fixedElements();
    sliders();
    accordions();
    tabs();
    modules.preloaderOff(_DOM.preloader);
  }); 

  /* Инициализация модулей. Страница: exampleAnchor.html */
  Route('/exampleanchor', (page) => {
    modules.anchors(_DOM.anchors, -25);
  }); 
}

/* Проверка на breakpoint */
// if (document.documentElement.clientWidth < 768) {}  

devModules.isWebp();