/* 
  Функция модального окна
  argModals - модальные окна
  argButtons - кнопки, открывающие модальные окна
  classActive - активный класс для модального окна

  Модальные окна должны содержать аргумент:
    [data-modal='name']

  Кнопки должны содержать аргумент:
    [data-open-modal='name']

  Модальные окна должны содержать три блока с классами:
    .modal__close
    .modal__overlay
    .modal__submit
*/
const modal = (argModals, argButtons, classActive = 'modal--visible') => {
  const modals = argModals || [];
  const buttonsOpenModal = argButtons || [];

  buttonsOpenModal.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const link = button.dataset.openModal;
      const modal = document.querySelector(`[data-modal='${link}']`);

      modal?.classList.add(classActive);
      modal?.focus();
    });
  });

  modals.forEach(modal => {
    const innerButtons = [
      modal.querySelector('.modal__close'),
      modal.querySelector('.modal__overlay'),
      modal.querySelector('.modal__submit')
    ];

    modal.addEventListener('keydown', (event) => event.key === 'Escape' ? modal.classList.remove(classActive) : false);
    innerButtons?.forEach(button => button?.addEventListener('click', () => modal.classList.remove(classActive) ));
  });
}

export default modal;