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
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})/)
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