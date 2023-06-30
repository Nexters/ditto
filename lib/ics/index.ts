import { HOSTING_URL } from '@/utils/const';
import ical, { ICalEventRepeatingFreq } from 'ical-generator';
import { Event } from '../supabase/type';

export const createICalendarEvents = (calendarName: string, _events: Event[]) => {
  const cal = ical({
    name: calendarName,
    events: _events.map((event) => ({
      summary: event.title,
      description: event.description,

      created: event.created_time,
      start: event.start_time,
      end: event.end_time,

      sequence: event.sequence,
      lastModified: event.updated_time,

      allDay: event.is_all_day,
      repeating: event.is_annual ? { freq: ICalEventRepeatingFreq.YEARLY } : null,
      url: HOSTING_URL,
    })),
  });
  return cal.toString();
};
