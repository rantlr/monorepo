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

function pad(number, digits = 2) {
  const string = `${number}`;

  if (string.length >= digits) {
    return string;
  }

  return pad(`0${string}`);
}

function getOrdinalIndicator(number) {
  if (number > 2 && number < 20) {
    return 'th';
  }

  const finalDigit = number % 10;

  if (finalDigit === 1) {
    return 'st';
  }

  if (finalDigit === 2) {
    return 'nd';
  }

  return 'th';
}

module.exports = time => {
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
    second,
  )} on ${dayName} ${monthName} ${date}${ordinalIndicator} ${year}`;
};
