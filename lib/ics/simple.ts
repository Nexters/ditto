import { Event } from '../supabase/type';

const prodId = 'Nexters/ditto';

export const createICS = (events: Event[]) => {
  const formatted = events.map(formatEvent).join('');
  const contents = [
    `BEGIN:VCALENDAR\r\n`,
    `VERSION:2.0\r\n`,
    `CALSCALE:GREGORIAN\r\n`,
    `PRODID:${prodId}\r\n`,
    `METHOD:PUBLISH\r\n`,
    `X-PUBLISHED-TTL:PT1H\r\n`,
    formatted,
    `END:VCALENDAR\r\n`,
  ].join('');

  return contents;
};

const formatDate = (date: string) => {
  return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
};

const escapeICS = (str: string) => {
  return str.replace(/[\\,;\n]/g, (match) => '\\' + match);
};

const formatEvent = ({ id, title, description, start_time, end_time, created_time }: Event) => {
  const start = formatDate(start_time);
  const end = formatDate(end_time);
  const created = formatDate(created_time);

  return [
    `BEGIN:VEVENT`,
    `UID:${id}`,
    `SUMMARY:${escapeICS(title)}`,
    `DTSTAMP:${created}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    description ? `DESCRIPTION:${escapeICS(description)}` : '',
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
