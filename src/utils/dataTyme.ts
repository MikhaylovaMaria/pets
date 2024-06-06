import { register } from "timeago.js";

function formatNum(
  f1: string,
  f: string,
  s: string,
  t: string,
  n: number
): string {
  const n10 = n % 10;
  let str = t;

  if (n === 1) {
    str = f1;
  } else if (n10 === 1 && n > 20) {
    str = f;
  } else if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
    str = s;
  }

  return str;
}

const seconds = formatNum.bind(
  null,
  "секунду",
  "%s секунду",
  "%s секунды",
  "%s секунд"
);
const minutes = formatNum.bind(
  null,
  "минуту",
  "%s минуту",
  "%s минуты",
  "%s минут"
);
const hours = formatNum.bind(null, "час", "%s час", "%s часа", "%s часов");
const days = formatNum.bind(null, "день", "%s день", "%s дня", "%s дней");
const weeks = formatNum.bind(
  null,
  "неделю",
  "%s неделю",
  "%s недели",
  "%s недель"
);
const months = formatNum.bind(
  null,
  "месяц",
  "%s месяц",
  "%s месяца",
  "%s месяцев"
);
const years = formatNum.bind(null, "год", "%s год", "%s года", "%s лет");

function russianLocale(number: number, index: number): [string, string] {
  switch (index) {
    case 0:
      return ["только что", "через несколько секунд"];
    case 1:
      return [seconds(number) + " назад", "через " + seconds(number)];
    case 2:
    case 3:
      return [minutes(number) + " назад", "через " + minutes(number)];
    case 4:
    case 5:
      return [hours(number) + " назад", "через " + hours(number)];
    case 6:
      return ["вчера", "завтра"];
    case 7:
      return [days(number) + " назад", "через " + days(number)];
    case 8:
    case 9:
      return [weeks(number) + " назад", "через " + weeks(number)];
    case 10:
    case 11:
      return [months(number) + " назад", "через " + months(number)];
    case 12:
    case 13:
      return [years(number) + " назад", "через " + years(number)];
    default:
      return ["", ""];
  }
}

// Регистрируем русский язык
register("ru", russianLocale);
