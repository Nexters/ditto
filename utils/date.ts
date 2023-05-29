import { formatISO, format, differenceInMilliseconds, isToday, set, add } from 'date-fns';

// @note: date input의 value에 알맞는 값을 반환한다.
export const formatISOForDateInput = (isAllDay: boolean, date: Date) => {
  return isAllDay ? formatISO(date, { representation: 'date' }) : formatISO(date).slice(0, -9);
};

export const createDate = (addHours?: number) => {
  const date = new Date();
  const _date = set(date, { minutes: 0, seconds: 0, milliseconds: 0 });
  return add(_date, { hours: addHours });
};

export const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatCreationDate = (date: string) => format(new Date(date), 'yyyy.MM.dd HH:mm');

export const differenceInMillisecondsFromNow = (date: string) => {
  return differenceInMilliseconds(new Date(date), new Date());
};

export const isTodayEvent = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  if (start < now && now < end) return true;
  return isToday(start) || isToday(end);
};

export const formatDateRange = (isAllDay: boolean, startDate: string, endDate: string) => {
  const now = toFormat(new Date());
  const start = toFormat(new Date(startDate));
  const end = toFormat(new Date(endDate));

  const _start: string[] = [];
  const _end: string[] = [];

  if (now.year !== start.year) _start.push(start.year);
  if (now.year !== end.year && start.year !== end.year) _end.push(end.year);

  _start.push(start.MMdd);
  if (start.MMdd !== end.MMdd) _end.push(end.MMdd);

  if (!isAllDay) _start.push(start.HHmm);
  if (!isAllDay && start.HHmm !== end.HHmm) _end.push(end.HHmm);

  const __start = _start.join(' ');
  const __end = _end.join(' ');

  return __end === '' ? __start : `${__start} ~ ${__end}`;
};

const toFormat = (date: Date) => {
  const year = format(date, 'yy년');
  const MMdd = format(date, 'M월 d일');
  const HHmm = format(date, 'HH:mm');
  return { year, MMdd, HHmm };
};
