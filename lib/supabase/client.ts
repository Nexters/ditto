import { SUPABASE_URL, SUPABASE_KEY } from '@/utils/const';
import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
