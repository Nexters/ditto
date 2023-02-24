// 항상 새로운 함수를 호출하여 현재 날짜를 가져오기 위함
export const dateInit = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  const KST = new Date(now.getTime() - offset);

  const yyyyMMddThhmm = KST.toISOString().split('.')[0].slice(0, -3);
  const yyyyMMdd = KST.toISOString().split('T')[0];
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
  return targetDate.toLocaleDateString('ko-kr', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 *
 * @param date ISO 형식의 날짜
 * @returns 'hh:mm'
 */
export const dateChangeToHHmm = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  return time;
};

const eventFormat = (targetDate: string) => `${dateChangeToMMdd(targetDate)} ${dateChangeToHHmm(targetDate)}`;

export const dateChangeToEventFormat = (startDate: string, endDate: string) => {
  const changedToMMdd = eventFormat(startDate);
  const changedToHHmm = eventFormat(endDate);
  if (startDate === endDate) return changedToMMdd || changedToHHmm;
  return `${changedToMMdd} - ${changedToHHmm}`;
};

export const dateChangeToyyyyMMddhhmm = (date: string) =>
  new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '.').slice(0, -3);
