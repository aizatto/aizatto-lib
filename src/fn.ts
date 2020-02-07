import * as url from "url";

export function setMath<T>(a: Set<T>, b: Set<T>) {
  return {
    remove: [...a].filter(x => !b.has(x)),
    add: [...b].filter(x => !a.has(x)),
  };
}

export function setEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }
  return true;
}

export function isValidDateString(date: string): string {
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    throw new Error(`Invalid date: ${date}`);
  }

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  if (month > 12) {
    throw new Error(`Invalid date: ${date}`);
  }

  if (day > 31) {
    throw new Error(`Invalid date: ${date}`);
  }

  if (isNaN(Date.parse(`${year}-${month}-${day}`))) {
    throw new Error(`Invalid date: ${date}`);
  }

  return date;
}

/**
 * Scenarios:
 * * urlA has hostname, urlB does not have hostname
 *
 * TODO: replace this logic, it is really basic
 */
export function compareURL(stringA: string, stringB: string): Boolean {
  const urlA = url.parse(stringA);
  const urlB = url.parse(stringB);
  new Set(["protocol", "host", "hostname", "path", "port"]).forEach(key => {
    let aValue = urlA[key];
    let bValue = urlB[key];

    if (key === "port") {
      if (aValue === null && urlA.protocol) {
        aValue = getDefaultPort(urlA.protocol);
      }

      if (bValue === null && urlB.protocol) {
        bValue = getDefaultPort(urlB.protocol);
      }
    }

    if (aValue && !bValue) {
      urlB[key] = aValue;
    } else if (!aValue && bValue) {
      urlA[key] = bValue;
    }
  });

  return url.format(urlA) === url.format(urlB);
}

function getDefaultPort(protocol) {
  switch (protocol) {
    case "http:":
      return 80;

    case "https:":
      return 443;

    default:
      return null;
  }
}

export function conjunction(sentences: string[]) {
  const { length } = sentences;

  let sentence = "";
  for (let i = 0; i < length; i += 1) {
    sentence += sentences[i];

    if (i < length - 2) {
      sentence += ", ";
    } else if (i === length - 2) {
      sentence += ", and ";
    }
  }

  return sentence;
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MARCH = 2;
const FEBRUARY_28 = 59;
const FEBRUARY_29 = 60;
const MARCH_1 = 61;

export function dayOfYear(date: Date): Number {
  const year = date.getFullYear();
  const isLeapYear = year % 4 === 0;

  const startOfYear = new Date(date.toString());
  startOfYear.setFullYear(year, 0, 0);
  startOfYear.setHours(0);

  const ms = date.getTime() - startOfYear.getTime();
  const days = Math.floor(ms / MS_IN_DAY);

  if (isLeapYear) {
    return days;
  }

  return date.getMonth() >= MARCH ? days + 1 : days;
}

export function currentDaysOfYear(date: Date): Array<Number> {
  const isLeapYear = date.getFullYear() % 4 === 0;

  const doy = dayOfYear(date);

  if (isLeapYear) {
    return [doy];
    // eslint-disable-next-line no-else-return
  } else if (doy <= FEBRUARY_28) {
    return [doy];
  } else if (doy === MARCH_1) {
    return [FEBRUARY_29, MARCH_1];
  }
  return [doy];
}
