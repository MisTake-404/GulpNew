/* Выполнение плавного перемещения до элемента */
const scrollTo = (element, offset = 0) => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - offset
  });
}

export default scrollTo;