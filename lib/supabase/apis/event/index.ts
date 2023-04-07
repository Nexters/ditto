import { supabase } from '@/lib/supabase/client';
import { Event } from '../../type';
import { CreateEventType, EventByIdType, UpdateEventType } from './type';

export const createEvent = async ({
  title,
  description,
  creatorId,
  groupId,
  isAllDay,
  isAnnual,
  startTime,
  endTime,
}: CreateEventType) => {
  const { error } = await supabase.from('events').insert({
    title,
    description,
    creator_id: creatorId,
    group_id: groupId,
    is_all_day: isAllDay,
    is_annual: isAnnual,
    start_time: startTime,
    end_time: endTime,
  });

  if (error) throw new Error(error.message);
  return;
};

export const getEventsList = async (currentGroupId: number) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('group_id', currentGroupId)
    .order('start_time', { ascending: true });
  if (error) throw new Error(error.message);
  return data as Event[];
};

export const getEventById = async (eventId: number) => {
  const { data, error } = await supabase.from('events').select('*, users(nickname)').eq('id', eventId);
  if (error) throw new Error(error.message);
  return data as EventByIdType;
};

export const updateEvent = async ({
  title,
  description,
  isAllDay,
  isAnnual,
  startTime,
  endTime,
  id,
  sequence,
  updatedTime,
}: UpdateEventType) => {
  const { error } = await supabase
    .from('events')
    .update({
      title,
      description,
      is_all_day: isAllDay,
      is_annual: isAnnual,
      start_time: startTime,
      end_time: endTime,
      sequence,
      updated_time: updatedTime,
    })
    .eq('id', id);
  if (error) throw new Error(error.message);
  return;
};

export const deleteEvent = async (eventId: number) => {
  const { error } = await supabase.from('events').delete().eq('id', eventId);
  if (error) throw new Error(error.message);
  return;
};
