function appendWidget() {
  const widget = document.createElement('div');
  widget.classList.add('gt-widget');

  const currentLang = document.createElement('img');
  currentLang.classList.add('gt-widget__current-lang');
  currentLang.id = 'changeLang';
  widget.append(currentLang);

  const modal = document.createElement('div');
  modal.classList.add('gt-modal');
  modal.style.display = 'none';

  const modalBg = document.createElement('div');
  modalBg.classList.add('gt-modal__bg');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('gt-modal__window');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('gt-modal__header');

  modalHeader.insertAdjacentHTML(
    'beforeend',
    '<div class="gt-modal__title">Выберите язык</div><button class="gt-modal__close" type="button">×</button>',
  );

  const modalBody = document.createElement('div');
  modalBody.classList.add('gt-modal__body');

  const modalGrid = document.createElement('div');
  modalGrid.classList.add('gt-modal__grid');

  for (const lang of googleTranslateConfig.langList) {
    modalGrid.insertAdjacentHTML(
      'beforeend',
      `<div class="gt-modal__item" data-google-lang="${lang.shortName}" lang="${lang.shortName}" translate="no">`
       + `<img alt="${lang.fullName}" class="language__img" src="${googleTranslateConfig.imgDirectoryPath}/lang__${lang.shortName}.png">`
       + `<span class="notranslate">${lang.fullName}</span>`
       + `</div>`,
    );
  }

  modalBody.append(modalGrid);

  modalWindow.append(modalHeader, modalBody);

  modal.append(modalBg, modalWindow);

  widget.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  const closeButtons = modal.querySelectorAll('.gt-modal__bg, .gt-modal__close, .gt-modal__item');
  closeButtons.forEach((element) => {
    element.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  document.body.append(widget);
  document.body.append(modal);
}

document.addEventListener('DOMContentLoaded', (event) => {
  let script = document.createElement('script');
  script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
  document.getElementsByTagName('head')[0].appendChild(script);

  appendWidget();
});

function TranslateWidgetIsLoaded() {
  TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
  if (config.langFirstVisit && !Cookies.get('googtrans')) {
    /* Если установлен язык перевода для первого посещения и куки не назначены */
    /* If the translation language is installed for the first visit and cookies are not assigned */
    TranslateCookieHandler('/auto/' + config.langFirstVisit);
  }

  let code = TranslateGetCode(config);

  document.getElementById('changeLang')
    .setAttribute('src', `${googleTranslateConfig.imgDirectoryPath}/lang__${code}.png`);

  TranslateHtmlHandler(code);

  if (code == config.lang) {
    /* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
    /* If the default language is the same as the language we are translating into, then we clear the cookies */
    TranslateCookieHandler(null, config.domain);
  }

  if (config.testWord) {
    TranslateMutationObserver(config.testWord, code == config.lang);
  }


  /* Инициализируем виджет с языком по умолчанию */
  /* Initialize the widget with the default language */
  new google.translate.TranslateElement({
    pageLanguage: config.lang,
    multilanguagePage: true, // Your page contains content in more than one languages
  });

  /* Вешаем событие  клик на флаги */
  /* Assigning a handler to the flags */
  TranslateEventHandler('click', '[data-google-lang]', function(e) {
    TranslateCookieHandler('/' + config.lang + '/' + e.getAttribute('data-google-lang'), config.domain);
    /* Перезагружаем страницу */
    /* Reloading the page */
    window.location.reload();
  });
}

function TranslateGetCode(config) {
  /* Если куки нет, то передаем дефолтный язык */
  /* If there are no cookies, then we pass the default language */
  let lang = Cookies.get('googtrans') != undefined && Cookies.get('googtrans') != 'null' ?
    Cookies.get('googtrans') :
    config.lang;
  return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
  /* Записываем куки /язык_который_переводим/язык_на_который_переводим */
  /* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
  Cookies.set('googtrans', val, {
    domain: document.domain,
    path: '/',
  });
  Cookies.set('googtrans', val, {
    domain: '.' + document.domain,
    path: '/',
  });

  if (domain == 'undefined') {
    return;
  }
  /* записываем куки для домена, если он назначен в конфиге */
  /* Writing down cookies for the domain, if it is assigned in the config */
  Cookies.set('googtrans', val, {
    domain: domain,
    path: '/',
  });

  Cookies.set('googtrans', val, {
    domain: '.' + domain,
    path: '/',
  });
}

function TranslateEventHandler(event, selector, handler) {
  document.addEventListener(event, function(e) {
    let el = e.target.closest(selector);
    if (el) {
      handler(el);
    }
  });
}

function TranslateHtmlHandler(code) {
  /* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
  /* We get the language to which we translate and produce the necessary manipulations with DOM */
  if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
    document
      .querySelector('[data-google-lang="' + code + '"]')
      .classList.add('language__img_active');
  }
}

function TranslateMutationObserver(word, isOrigin) {

  if (isOrigin) {
    window.dispatchEvent(new CustomEvent('FinishTranslate'));
  } else {

    /* Создаем скрытый блок в который добавляем тестовое слово на оригинальном языке. Это позволит нам отследить момент когда сайт будет переведен и вызвать событие "FinishTranslate"  */
    /* Creating a hidden block in which we add a test word in the original language. This will allow us to track the moment when the site is translated and trigger the "FinishTranslate" event  */

    let div = document.createElement('div');
    div.id = 'googleTranslateTestWord';
    div.innerHTML = word;
    div.style.display = 'none';
    document.body.prepend(div);

    let observer = new MutationObserver(() => {
      document.dispatchEvent(new CustomEvent('FinishTranslate'));
      observer.disconnect();
    });

    observer.observe(div, {
      childList: false,
      subtree: true,
      characterDataOldValue: true
    });
  }
}
