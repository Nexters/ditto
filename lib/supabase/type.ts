import { Database } from '@/lib/supabase/schema';

export type User = Database['public']['Tables']['users']['Row'];

export type BucketFolder = Database['public']['Tables']['bucket_folders']['Row'];

export type BucketItem = Database['public']['Tables']['bucket_items']['Row'];

export type Event = Database['public']['Tables']['events']['Row'];

export type Invitation = Database['public']['Tables']['invitations']['Row'];

export type Group = Database['public']['Tables']['groups']['Row'];

export type GroupMember = Database['public']['Tables']['group_members']['Row'];

// joined

export type InvitationInfo = Invitation & {
  groups: Pick<Group, 'name'>;
  users: Pick<User, 'nickname'>;
};
