import { BucketFolder, BucketItem, User } from '@/lib/supabase/type';

export type TCreateBucketItem = Omit<BucketItem, 'id' | 'created_time' | 'group_id' | 'creator_id'>;
export type TCreateBucketFolder = Omit<BucketFolder, 'id' | 'created_time'>;

export interface ICreateBucketItemParams {
  item: TCreateBucketItem;
  user: User | null;
  selectedGroupId: number | null;
}

export interface ICreateBucketFolderParams {
  folder: TCreateBucketFolder;
  user: User | null;
  selectedGroupId: number | null;
}
