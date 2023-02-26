import { formatISO, getMonth, getDate, format, sub, differenceInMilliseconds } from 'date-fns';

const DAY_TO_MILLISECOND = 1000 * 60 * 60 * 24;

export const eventDateForView = (isAllDay: boolean, date?: string) => {
  return isAllDay
    ? formatISO(date ? new Date(date) : new Date(), { representation: 'date' })
    : formatISO(date ? new Date(date) : new Date()).slice(0, -9);
};

export const eventDateForSave = (isAllDay: boolean, date: string) => {
  return format(
    // 하루종일 일때는 yyyy-mm-dd 형식이라 hour sub가 되지 않음. 그렇기 때문에 HH:mm을 추가하고 값을 보여줄 때 워싱해서 보여줘야 함
    sub(new Date(isAllDay ? `${date} 00:00` : date), {
      hours: 9,
    }),
    'yyyy-MM-dd HH:mm'
  );
};

export const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// MM월 dd일
export const dateChangeToMMdd = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return `${getMonth(new Date(targetDate)) + 1}월 ${getDate(new Date(targetDate))}일`;
};

// hh:mm
export const dateChangeToHHmm = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return format(new Date(targetDate), 'HH:mm');
};

const eventFormat = (targetDate: string) => `${dateChangeToMMdd(targetDate)} ${dateChangeToHHmm(targetDate)}`;

export const dateChangeToEventFormat = (startDate: string, endDate: string) => {
  const changedToMMdd = eventFormat(startDate);
  const changedToHHmm = eventFormat(endDate);
  if (startDate === endDate) return changedToMMdd || changedToHHmm;
  else if (differenceInMilliseconds(new Date(endDate), new Date(startDate)) % DAY_TO_MILLISECOND === 0)
    // hour subtract를 위해 해줬던 hh:mm 제거하기
    return `${changedToMMdd.slice(0, -5)} - ${changedToHHmm.slice(0, -5)}`;
  return `${changedToMMdd} - ${changedToHHmm}`;
};

// 생성 날짜
// yyyy.MM.dd hh:mm
export const creationDate = (date: string) =>
  formatISO(new Date(date)).replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '.').slice(0, -9);
