jQuery(function($) {
  const DATE = new Date();

  const CURR_MONTH = 9;
  const CURR_MONTH_YEAR = 2021;

  let isLastMonthInYear = CURR_MONTH === 11;
  const NEXT_MONTH = isLastMonthInYear ? 0 : (CURR_MONTH + 1);
  const NEXT_MONTH_YEAR = isLastMonthInYear ? (CURR_MONTH_YEAR + 1) : CURR_MONTH_YEAR;

  const MONTH_NAMES = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  let $calendars = $('.calendar');
  let $calendarCurr = $calendars.filter('.calendar--current-month');
  let $calendarNext = $calendars.filter('.calendar--next-month');

  generateCalendar($calendarCurr, CURR_MONTH_YEAR, CURR_MONTH);
  generateCalendar($calendarNext, NEXT_MONTH_YEAR, NEXT_MONTH);

  fillCalendars();

  function generateCalendar($calendar, year, month) {
    let $title = $calendar.find('.calendar__title');
    $title.text(MONTH_NAMES[month]);

    const DAYS_IN_MONTH = new Date(year, month + 1, 0).getDate();
    const FIRST_DAY_OF_WEEK = new Date(year, month, 1).getDay();
    const DAYS_BEFORE_FIRST_DAY = [6, 0, 1, 2, 3, 4, 5];

    let $calendarList = $calendar.find('.calendar__list');

    for (let i = 0; i < DAYS_BEFORE_FIRST_DAY[FIRST_DAY_OF_WEEK]; i++) {
      $calendarList.append($('<div>'));
    }

    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
      let $day = $('<div>', {
        class: 'calendar__day',
        'data-date': year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + i).slice(-2)
      });

      let $dayNum = $('<div>', {
        class: 'calendar__num',
        text: i
      });

      $day.append($dayNum);
      $calendarList.append($day);
    }
  }

  function fillCalendars() {
    let $days = $calendars.find('.calendar__day');

    $.ajax('get_events.html')
      .done(function(data) {
        data = JSON.parse(data);
        data.forEach(function(item) {
          let $day = $days.filter('[data-date=' + item.event_date + ']');

          $day.addClass('calendar__day--active');
          $day.append($('<div>', {
            class: 'calendar__text',
            text: item.event_name
          }));
        });
      })
    ;

    $.ajax('get_tooltips.html')
      .done(function(data) {
        data = JSON.parse(data);
        data.forEach(function(item) {
          let $day = $days.filter('[data-date=' + item.day + ']');
          $day.append($('<div>', {
            class: 'calendar__tooltip',
            text: item.status === 'full' ? 'Дата занята' : 'Количество игр: ' + item.status
          }));
        });
      })
    ;
  }
});