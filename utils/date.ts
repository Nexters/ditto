import { formatISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const eventDateForView = (isAllDay: boolean, date?: string) => {
  return isAllDay
    ? formatISO(date ? new Date(date) : new Date(), { representation: 'date' })
    : formatISO(date ? new Date(date) : new Date()).slice(0, -9);
  // const KSTDate = date ? new Date(date) : new Date();
  // const UTCDate = date ? utcToZonedTime(date, 'UTC') : new Date();
  // const conditionalDate = mode === 'create' ? KSTDate : UTCDate;
  // return isAllDay ? formatISO(conditionalDate, { representation: 'date' }) : formatISO(conditionalDate).slice(0, -9);
};

export const eventDateForSave = (isAllDay: boolean, date: string) => {
  return isAllDay
    ? format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd')
    : format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd HH:mm');
};

export const addDays = (date: string | number | Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatCreationDate = (date: string) => format(new Date(date), 'yyyy.MM.dd HH:mm');

const formatMMddHHmm = (targetDate: string) =>
  `${format(utcToZonedTime(targetDate, 'UTC'), 'MM월 dd일')} ${format(utcToZonedTime(targetDate, 'UTC'), 'HH:mm')}`;

export const formatEventDate = (startDate: string, endDate: string) => {
  const formattedStartDate = formatMMddHHmm(startDate);
  const formattedEndDate = formatMMddHHmm(endDate);

  // if (startDate === endDate) {
  //   if (format(new Date(startDate), 'HH:mm') === '00:00') return formattedStartDate.slice(0, -5);
  //   return formattedStartDate || formattedEndDate;
  // }

  // if ([format(new Date(startDate), 'HH:mm'), format(new Date(endDate), 'HH:mm')].every((v) => v === '00:00'))
  //   return `${formattedStartDate.slice(0, -5)} - ${formattedEndDate.slice(0, -5)}`;
  return `${formattedStartDate} - ${formattedEndDate}`;
};
