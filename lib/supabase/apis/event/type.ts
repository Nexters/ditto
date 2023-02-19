import { CreateEvent } from '@/lib/supabase/type';
import { SnakeToCamelCase } from '@/utils/type';

export type CreateEventType = SnakeToCamelCase<CreateEvent>;
