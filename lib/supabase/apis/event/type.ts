import { SnakeToCamelCase } from '@/utils/type';
import { Database } from '@/lib/supabase/schema';
import { Event, User } from '../../type';

export type EventType = SnakeToCamelCase<Event>;

export type CreateEventType = SnakeToCamelCase<Database['public']['Tables']['events']['Insert']>;

export type UpdateEventType = Partial<EventType>;

export type EventByIdType = (Event & { users: Pick<User, 'nickname'> })[];
