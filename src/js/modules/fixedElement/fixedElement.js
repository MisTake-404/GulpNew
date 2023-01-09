/*
  Функция фиксирует элемент на определенной высоте
  element - элемент, который необходимо зафиксировать
  offset - позиция, с которой необходимо зафиксировать элемент
  classFixed - класс, который будет присвоен активному элементу
  fixHeight - фикс. скочка из-за изменения высоты документа при фиксировании элемента
  fixHeightElement - невидимый элемент, который активируется при фиксировании элемента, поправив высоту
  fixHeightClass - класс, который будет применён при фиксировании элемента
*/

const fixedElement = (element, offset = 0, classFixed = 'fixed', fixHeight = false, fixHeightElement, fixHeightClass = 'active') => {
  window.addEventListener('scroll', (e) => {
    const windowPosition = window.pageYOffset;

    if(!fixHeight) {
      windowPosition >= offset
      ? element.classList.add(classFixed)
      : element.classList.remove(classFixed);
    } else {
      if(windowPosition >= offset) {
        element.classList.add(classFixed);
        fixHeightElement.classList.add(fixHeightClass);
      } else {
        element.classList.remove(classFixed);
        fixHeightElement.classList.remove(fixHeightClass);
      }
    }
    
    
  }
);
}

export default fixedElement;