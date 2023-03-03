import { formatISO, getMonth, getDate, format, sub, differenceInMilliseconds, isToday } from 'date-fns';

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
  return `${getMonth(targetDate) + 1}월 ${getDate(targetDate)}일`;
};

// hh:mm
export const dateChangeToHHmm = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return format(targetDate, 'HH:mm');
};

const eventFormat = (targetDate: string) => `${dateChangeToMMdd(targetDate)} ${dateChangeToHHmm(targetDate)}`;

export const dateChangeToEventFormat = (startDate: string, endDate: string) => {
  const changedToMMdd = eventFormat(startDate);
  const changedToHHmm = eventFormat(endDate);

  if (startDate === endDate) {
    if (format(new Date(startDate), 'HH:mm') === '00:00') return changedToMMdd.slice(0, -5);
    return changedToMMdd || changedToHHmm;
  }

  if ([format(new Date(startDate), 'HH:mm'), format(new Date(endDate), 'HH:mm')].every((v) => v === '00:00'))
    return `${changedToMMdd.slice(0, -5)} - ${changedToHHmm.slice(0, -5)}`;
  return `${changedToMMdd} - ${changedToHHmm}`;
};

// 생성 날짜
// yyyy.MM.dd hh:mm
export const formatCreationDate = (date: string) =>
  formatISO(new Date(date)).replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '.').slice(0, -9);

export const differenceInMilisecondsFromNow = (date: string) =>
  // slice(0, -6)을 해주는 이유는 db에 저장된 +00:00 과 현재 시간으로 포맷팅 했을 때 +09:00의 차이를 없애고 비교하기 위함
  differenceInMilliseconds(
    // db에 저장된 시간
    new Date(date.slice(0, -6)),
    // 현재 시간
    new Date(formatISO(new Date()).slice(0, -6))
  );

export const today = (startDate: string, endDate: string) => {
  return isToday(new Date(startDate)) || isToday(new Date(endDate));
};
