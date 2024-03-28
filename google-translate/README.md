# Виджет для перевода сайта с помощью Google Translate (GT)

## Подключение:

1. Подключить библиотеку для работы с куки https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js
2. Подключить стили и скрипты виджета: **google-translate/js/script.js** и **google-translate/css/style.css**
3. Добавить в **window** переменную **googleTranslateConfig** с конфигурацией виджета. Пример:

        window.googleTranslateConfig = {
          lang: "ru",
          testWord: "Язык",
          langFirstVisit: 'en',
          // domain: "Get-Web.Site",
          langList: [
            {
              shortName: 'es',
              fullName: 'Español',
            },
            {
              shortName: 'en',
              fullName: 'English',
            },
            {
              shortName: 'fr',
              fullName: 'Français',
            },
            {
              shortName: 'it',
              fullName: 'Italiano',
            },
            {
              shortName: 'nl',
              fullName: 'Nederlands',
            },
            {
              shortName: 'pt',
              fullName: 'Português',
            },
            {
              shortName: 'ru',
              fullName: 'Русский',
            },
            {
              shortName: 'sv',
              fullName: 'Svenska',
            },
          ],
          imgDirectoryPath: 'google-translate/img',
        }

**Обязательные параметры:**
* **lang** - Строка, содержащая код языка, на котором в написан исходный контент сайта.
* **langList** - Список доступных языков. Содержит массив объектов с 2 свойствами:
  * **shortName** - Строка, содержащая код языка. Передается в GT.
  * **fullName** - Строка, содержащая самоназвание языка. Выводится в интерфейсе, не переводится скриптом.
* **imgDirectoryPath** - Строка, содержащая путь к директории с картинками без "/" в конце строки. Файлы с картинками должны иметь названия **lang__CODE.png**, где **CODE** - код языка.

**Опциональные параметры:**
* **testWord** - Строка, содержащая слово для проверки перевода. Если оно задано, то скрипт будет генерировать событие **FinishTranslate** после завершения перевода на элементе **window**.
* **langFirstVisit** - Строка, содержащая код языка на котором будет отображаться сайт при первом посещении.

Доступные коды языков можно посмотреть [здесь](https://developers.google.com/admin-sdk/directory/v1/languages).
