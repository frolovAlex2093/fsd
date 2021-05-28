import Calendar from './datepicker';

const calendarContainers = $('.datepicker-here');

calendarContainers.each((_, element) => {
    new Calendar(element);
});