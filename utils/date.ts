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
export const formatToMMDD = (date?: string) => {
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
export const formatToHHMM = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
  return time;
};
