import isTargetScroll from "../utils/isTargetScroll.js";

/*
  Функция добавляет класс (активный) элементу-навигации, если при прокрутке страницы,
  координаты элемента-навигации совпадают с элементом, 
  на которого ссылается (якорем) данный элемент-навигации

  links - элементы навигации (должны содержать параметр href с ссылкой якорем Пример: href="#link")
  classActive - класс, который добавится к активному элементу
  previewElement - добавлять ли первый элемент активным
  idPreviewElement - индекс элемента, который должен быть активным (при загрузке страницы)

*/
const isLinkActive = (links, classActive = '', previewElement = true, idPreviewElement = 0) => {
  const previewElementActive = previewElement 
  ? links[idPreviewElement]
  : null;

  if(previewElement) previewElementActive.classList.add(classActive);

  let nextElementActive = previewElementActive !== null ? previewElementActive : null;

  links.forEach(link => {
    let linkParent = link.getAttribute('href');

    linkParent = linkParent.substring(0, 1) === '#'
      ? linkParent.substring(1, linkParent.length)
      : null;

    if(linkParent === null) {
      return {
        error: true,
        message: 'В ссылке в параметре href ошибка. Href должен иметь вид #example ссылаясь на target элемент по id'
      };
    }

    isTargetScroll([document.getElementById(linkParent)], (parent) => {
      nextElementActive = nextElementActive === null
        ? link
        : nextElementActive;

      if(nextElementActive !== null 
        && nextElementActive !== undefined
        && nextElementActive.classList.contains(classActive)
        && nextElementActive !== link) {
        nextElementActive.classList.remove(classActive);
      }
                           
      if(!nextElementActive.classList.contains(classActive) && nextElementActive !== link) {
        link.classList.add(classActive);
        nextElementActive = link;
      }
    });
  });
}

export default isLinkActive;