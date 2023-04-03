import { HOSTING_URL } from '@/utils/const';
import { nanoid } from 'nanoid';
import { Event } from '../supabase/type';

const prodId = 'Nexters/ditto';

export const createICS = (calendarName: string, events: Event[]) => {
  const formattedEvents = events.map(formatEvent).join('');
  const formattedCalendarName = foldLine(`X-WR-CALNAME:${calendarName}`);
  const contents = [
    `BEGIN:VCALENDAR\r\n`,
    `VERSION:2.0\r\n`,
    `CALSCALE:GREGORIAN\r\n`,
    `PRODID:${prodId}\r\n`,
    `METHOD:PUBLISH\r\n`,
    `${formattedCalendarName}\r\n`,
    `X-PUBLISHED-TTL:PT1H\r\n`,
    formattedEvents,
    `END:VCALENDAR\r\n`,
  ].join('');

  return contents;
};

const formatDate = (date: string) => {
  return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
};

const formatEvent = ({ title, description, start_time, end_time, created_time }: Event) => {
  const start = formatDate(start_time);
  const end = formatDate(end_time);
  const created = formatDate(created_time);

  return [
    `BEGIN:VEVENT`,
    `UID:${nanoid()}`,
    `SUMMARY:${formatText(title)}`,
    `DTSTAMP:${created}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DESCRIPTION:${formatText(description)}`,
    `URL:${HOSTING_URL}`,
    `CREATED:${created}`,
    `END:VEVENT`,
  ]
    .filter(Boolean)
    .map((str) => foldLine(str) + '\r\n')
    .join('');
};

const foldLine = (line: string) => {
  const parts = [];
  let length = 75;
  while (line.length > length) {
    parts.push(line.slice(0, length));
    line = line.slice(length);
    length = 74;
  }
  parts.push(line);
  return parts.join('\r\n\t');
};

const formatText = (text: string) => {
  return text.replace(/\\/gm, '\\\\').replace(/\r?\n/gm, '\\n').replace(/;/gm, '\\;').replace(/,/gm, '\\,');
};
