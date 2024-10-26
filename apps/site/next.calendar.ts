import type { CalendarEvent } from '@/types';

import {
  BASE_CALENDAR_URL,
  SHARED_CALENDAR_KEY,
} from './next.calendar.constants';

export const getCalendarEvents = async (calendarId = '', maxResults = 20): Promise<Array<CalendarEvent>> => {
  const currentDate = new Date();
  const nextWeekDate = new Date();

  nextWeekDate.setDate(currentDate.getDate() + 7);

  const calendarQueryParams = new URLSearchParams({
    calendarId,
    maxResults: maxResults.toString(),
    singleEvents: 'true',
    timeZone: 'Etc/Utc',
    key: SHARED_CALENDAR_KEY,
    timeMax: nextWeekDate.toISOString(),
    timeMin: currentDate.toISOString(),
  });

  const calendarQueryUrl = new URL(`${BASE_CALENDAR_URL}${calendarId}/events`);

  calendarQueryParams.forEach((value, key) =>
    calendarQueryUrl.searchParams.append(key, value)
  );

  return fetch(calendarQueryUrl.toString())
    .then(response => response.json())
    .then(calendar => calendar.items ?? []);
};