import { EventAttributes, DateArray, createEvents } from 'ics';
import { Event } from '../supabase/type';

export const icsCreateEvents = (events: Event[]): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    createEvents(events.map(event2attributes), (error, value) => {
      if (error) return reject(error);
      resolve(value);
    });
  });
};

const date2DateArray = (_date: string, withTime = true): DateArray => {
  const date = new Date(_date);
  const array: DateArray = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  if (withTime) return [...array, date.getHours(), date.getMinutes()];
  return array;
};

const event2attributes = (event: Event): EventAttributes => {
  return {
    title: event.title,
    description: event.description,
    start: date2DateArray(event.start_time, !event.is_all_day),
    end: date2DateArray(event.end_time, !event.is_all_day),
    created: date2DateArray(event.created_time),
    startInputType: 'local',
  };
};
