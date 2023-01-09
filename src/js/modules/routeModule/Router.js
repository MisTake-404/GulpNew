/* Модуль для вызова других модулей на определенных страницах */
const Router = () => {
  const arrayRoute = [];
  /* 
    Функция парсит наименование страницы
  */
  const parsePage = (loc) => {
    let pathname = loc.toLowerCase();
    const path = pathname;

    const dot = pathname.indexOf('.');
    const slash = pathname.indexOf('/');

    if(dot !== -1) {
      pathname = pathname.substring(0, dot);
    }

    if(slash !== -1) {
      pathname = pathname.split('/');
      pathname = pathname[pathname.length - 1];
    }

    if(pathname.length === 0) {
      pathname = '/';
    }

    return [
      path,
      pathname
    ]
  }

  /* Сравнивает два pathname */
  const comparisonPages = (page = 'index') => {
    const [path, pathname] = parsePage(location.pathname);
    const [pagePath, pagePathname] = parsePage(page);

    return pathname === pagePathname
      ? {
        comparison: true,
        pagePath,
        pagePathname
      }
      : {
        comparison: false,
        pagePath,
        pagePathname
      };
  }

  /* Функция регистрирует Route */
  const Route = (page, callback) => {
    const {comparison, pagePath, pagePathname} = comparisonPages(page);
  
    arrayRoute.push({
      path: pagePath,
      pathname: pagePathname,
      cb: () => callback(page)
    });

    return comparison ? callback(page) : false;
  }

  return [Route, arrayRoute];
}

export default Router;