import { Database } from '@/lib/supabase/schema';

export type User = Database['public']['Tables']['users']['Row'];

export type BucketFolder = Database['public']['Tables']['bucket_folders']['Row'];

export type TBucketItem = Database['public']['Tables']['bucket_items']['Row'];

type EventRow = Database['public']['Tables']['events']['Row'];

export type Event = Omit<EventRow, 'description' | 'is_all_day' | 'is_annual'> & {
  description: string;
  is_all_day: boolean;
  is_annual: boolean;
};

export type Invitation = Database['public']['Tables']['invitations']['Row'];

export type Group = Database['public']['Tables']['groups']['Row'];

export type GroupMember = Database['public']['Tables']['group_members']['Row'];

export type FcmToken = Database['public']['Tables']['fcm_tokens']['Row'];

// joined

export type InvitationInfo = Invitation & {
  groups: Pick<Group, 'name'>;
  users: Pick<User, 'nickname'>;
};
