import { SnakeToCamelCase } from '@/utils/type';
import { Database } from '@/lib/supabase/schema';

export type CreateEventType = SnakeToCamelCase<Database['public']['Tables']['events']['Insert']>;
