const checkForm = (argForm, argIsError) => {
  let isError = true;

  if(!argIsError) return true;

  [...argForm.elements].forEach(function(element) {
    if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT') {
      if(element.value === '') {
        element.style.outline = '2px solid red';
        isError = false;
      } else {
        element.style.outline = 'none';
        isError = true;
      }
    }
  });

  return isError;
}

const getForms = (argContainer, argSubmit) => {
  const container = document.querySelectorAll(argContainer);
  const data = [];

  for(let i = 0; i < container.length; i++) {
    const form = container[i].querySelector('form');

    data[i] = form !== null
      ? { container: container[i], form: form, submit: form.querySelector(argSubmit) }
      : null;
  }

  return data;
}

const ajaxAsyncSend = async (argForm, argUrl) => {
  let dataUrlencoded = new URLSearchParams();
  for(let prop of [...argForm.elements]) {
    if(prop.name !== '') {
      dataUrlencoded.append(prop.name, prop.value);
    }
  }
  
  try {
    let response = await fetch(argUrl, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataUrlencoded
    }); 

    return await response;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

/*
  argContainer - контейнер, в котором расположена форма
  argSubmit - кнопка отправки формы
  argUrl - принимает URL запроса (адрес отправки запроса)
  argIsError - boolean (true/false). Валидация полей формы на наличие значения
  argEndLine - адрес адресации после отправки запроса. (Если нет необходимости, то значение "none")
*/
const ajaxForms = (argContainer, argSubmit, argUrl = '/', argIsError = true, argEndLine = '/thanks') => {
  const data = getForms(argContainer, argSubmit);

  if(data.length === 0) {
    return false;
  }

  data.forEach((container) => {
    if(container !== null && container.submit !== null) {
      container.submit.addEventListener('click', async (event) => {
        event.preventDefault();

        if(checkForm(container.form, argIsError)) {
          const res = await ajaxAsyncSend(container.form, argUrl);

          if(await res) {
            if(argEndLine !== 'none') {
              window.location.href = argEndLine;
            }
          }
        }
      });
    }
  });
}

export default ajaxForms;