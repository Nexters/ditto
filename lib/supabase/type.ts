import { Database } from '@/lib/supabase/schema';

export type User = Database['public']['Tables']['users']['Row'];

export type BucketFolder = Database['public']['Tables']['bucket_folders']['Row'];

export type BucketItem = Database['public']['Tables']['bucket_items']['Row'];
