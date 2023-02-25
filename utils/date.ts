import { formatISO, getMonth, getDate, format } from 'date-fns';

// toISOString : 저장용 / db에 저장할때
// toLocaleString : 뷰용 / datepicker, create_time을 보여줄때 사용하기

/**
 * 항상 새로운 함수를 호출하여 현재 날짜를 가져오기 위함
 */

export const forViewEventDate = (date?: string) => {
  const yyyyMMddThhmm = formatISO(date ? new Date(date) : new Date()).slice(0, -9);
  const yyyyMMdd = formatISO(date ? new Date(date) : new Date(), { representation: 'date' });
  return { yyyyMMddThhmm, yyyyMMdd };
};

export const forSaveEventDate = (date: string) => {
  const yyyyMMddThhmm = `${formatISO(new Date(date)).slice(0, -9)}Z`;
  const yyyyMMdd = formatISO(new Date(date), { representation: 'date' });
  return { yyyyMMddThhmm, yyyyMMdd };
};

export const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 *
 * @param date ISO 형식의 날짜
 * @returns 'MM월 dd일'
 */
export const dateChangeToMMdd = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return `${getMonth(new Date(targetDate)) + 1}월 ${getDate(new Date(targetDate))}일`;
};

/**
 *
 * @param date ISO 형식의 날짜
 * @returns 'hh:mm'
 */
export const dateChangeToHHmm = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return format(new Date(targetDate), 'HH:mm');
};

const eventFormat = (targetDate: string) => `${dateChangeToMMdd(targetDate)} ${dateChangeToHHmm(targetDate)}`;

export const dateChangeToEventFormat = (startDate: string, endDate: string) => {
  const changedToMMdd = eventFormat(startDate);
  const changedToHHmm = eventFormat(endDate);
  if (startDate === endDate) return changedToMMdd || changedToHHmm;
  return `${changedToMMdd} - ${changedToHHmm}`;
};

export const dateChangeToyyyyMMddhhmm = (date: string) =>
  formatISO(new Date(date)).replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '.').slice(0, -9);
