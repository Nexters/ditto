import { Event } from '@/lib/supabase/type';
import { add, isToday } from 'date-fns';

export type EventForView = Event & {
  cloned?: boolean;
  origin_event_id?: number;
};

export type EventsForView = {
  completed: EventForView[];
  planned: EventForView[];
};

export const toEventsForView = (events: Event[]): EventsForView => {
  const completed: Event[] = [];
  const planned: Event[] = [];

  events.forEach((event) => {
    if (!isPassedEvent(event)) {
      return planned.push(event);
    }

    completed.push(event);
    if (event.is_annual) {
      let next = createNextYearEvent(event, event.id);
      while (isPassedEvent(next)) {
        completed.push(next);
        next = createNextYearEvent(next, event.id);
      }
      planned.push(next);
    }
  });

  completed.sort((a, b) => compareDateDescending(a.end_time, b.end_time));
  planned.sort((a, b) => compareDateAscending(a.start_time, b.start_time));

  return { completed, planned };
};

const isPassedEvent = (event: Event) => {
  const end = new Date(event.end_time);
  const now = new Date();
  if (event.is_all_day && isToday(end)) return false;
  return now > end;
};

const createNextYearEvent = (curr: Event, origin_event_id: number): EventForView => {
  const nextStart = add(new Date(curr.start_time), { years: 1 });
  const nextEnd = add(new Date(curr.end_time), { years: 1 });

  return {
    ...curr,
    // @note: 연단위 반복이므로 id 값을 유니크하게 만들기 위함
    id: parseFloat(`${origin_event_id}.${nextStart.getFullYear()}`),
    cloned: true,
    origin_event_id,
    start_time: nextStart.toISOString(),
    end_time: nextEnd.toISOString(),
  };
};

const compareDateAscending = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (dateA === dateB) return 0;
  return dateA < dateB ? -1 : 1;
};

const compareDateDescending = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (dateA === dateB) return 0;
  return dateA > dateB ? -1 : 1;
};
