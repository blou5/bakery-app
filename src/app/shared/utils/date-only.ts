export type DateOnly = string;

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

export function toDateOnly(value: Date | string): DateOnly {
  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const date = value.getDate();

  return `${year}-${pad(month)}-${pad(date)}`;
}

export function toPickerDate(value: Date | string): Date {
  if (value instanceof Date) {
    return value;
  }

  const [year, month, date] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, date);
}
