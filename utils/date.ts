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

export const differenceInMilisecondsFromNow = (date: string) =>
  // slice(0, -6)을 해주는 이유는 db에 저장된 +00:00 과 현재 시간으로 포맷팅 했을 때 +09:00의 차이를 없애고 비교하기 위함
  differenceInMilliseconds(
    // db에 저장된 시간
    new Date(date.slice(0, -6)),
    // 현재 시간
    new Date(formatISO(new Date()).slice(0, -6))
  );

export const today = (startDate: string, endDate: string) => isToday(new Date(startDate)) || isToday(new Date(endDate));

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
