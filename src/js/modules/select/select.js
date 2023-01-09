import Choices from "choices.js";

/* DOCS: https://github.com/Choices-js/Choices */
/* TUTORIAL: https://www.youtube.com/watch?v=dnC7XCYb9Qg */

/*
  Инициализация кастомных select
*/
const selects = (selects) => {
  const choises = [];

  const config = {
    searchEnabled: false,
    searchChoices: false,
    placeholder: true,  // Наличие placeholder
    loadingText: 'Загрузка...',
    noResultsText: 'Нет результатов',
    noChoicesText: 'Нет результатов',
    itemSelectText: 'Нажмите, чтобы выбрать',
    allowHTML: false,
  };

  selects.forEach(select => choises.push(new Choices(select, config)));

  return choises;
}

export default selects;