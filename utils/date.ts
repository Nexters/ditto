import { utcToZonedTime } from 'date-fns-tz';
import { formatISO, format, differenceInMilliseconds, isToday, getMonth, getDate } from 'date-fns';

export const eventDateForView = (isAllDay: boolean, date?: string) => {
  return isAllDay
    ? formatISO(date ? new Date(date) : new Date(), { representation: 'date' })
    : formatISO(date ? new Date(date) : new Date()).slice(0, -9);
};

export const eventDateForSave = (isAllDay: boolean, date: string) => {
  return isAllDay
    ? format(utcToZonedTime(`${date}Z`, 'UTC'), 'yyyy-MM-dd')
    : format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd HH:mm');
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

export const today = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  if (start < now && now < end) return true;
  return isToday(start) || isToday(end);
};

// MM월 dd일
const formatToMMdd = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return `${getMonth(targetDate) + 1}월 ${getDate(targetDate)}일`;
};

// hh:mm
const formatToHHmm = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return format(targetDate, 'HH:mm');
};

const eventFormat = (targetDate: string) => `${formatToMMdd(targetDate)} ${formatToHHmm(targetDate)}`;

const isEqualHHmm = (startDate: string, endDate: string) =>
  format(new Date(startDate), 'HH:mm') === format(new Date(endDate), 'HH:mm');

const isEqualMMdd = (startDate: string, endDate: string) =>
  format(new Date(startDate), 'MM dd') === format(new Date(endDate), 'MM dd');

export const changedToEventDate = (isAllDay: boolean, startDate: string, endDate: string) => {
  const changedToMMdd = eventFormat(startDate);
  const changedToHHmm = eventFormat(endDate);

  if (isAllDay && isEqualHHmm(startDate, endDate)) {
    if (isEqualMMdd(startDate, endDate)) {
      return changedToMMdd.slice(0, -5);
    }
    return `${changedToMMdd.slice(0, -5)} - ${changedToHHmm.slice(0, -5)}`;
  }
  return `${changedToMMdd} - ${changedToHHmm}`;
};
