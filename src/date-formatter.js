// @flow

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function pad(num: number, digits = 2) {
  return `000000000000000${num}`.slice(-digits);
}

function getOrdinalIndicator(num: number) {
  if (num > 2 && num < 20) {
    return 'th';
  }

  const finalDigit = num % 10;

  if (finalDigit === 1) {
    return 'st';
  }

  if (finalDigit === 2) {
    return 'nd';
  }

  return 'th';
}

module.exports = function formatDate(time: string | Date) {
  if (typeof time === 'string') {
    return formatDate(new Date(time));
  }

  const second = time.getSeconds();
  const minute = time.getMinutes();
  const hour = time.getHours();
  const day = time.getDay();
  const dayName = days[day];
  const month = time.getMonth();
  const monthName = months[month];
  const date = time.getDate();
  const ordinalIndicator = getOrdinalIndicator(date);
  const year = time.getFullYear();

  return `${pad(hour)}:${pad(minute)}:${pad(
    second
  )} on ${dayName} ${monthName} ${date}${ordinalIndicator} ${year}`;
};
