import { BucketFolder, TBucketItem, User } from '@/lib/supabase/type';

export type TCreateBucketItem = Omit<TBucketItem, 'id' | 'created_time' | 'group_id' | 'creator_id'>;
export type TCreateBucketFolder = Omit<BucketFolder, 'id' | 'created_time' | 'group_id' | 'creator_id'>;

export type TUpdateBucketItem = Partial<TBucketItem>;
export type TUpdateBucketFolder = Partial<BucketFolder>;

export type TCreateBucketItemParams = {
  item: TCreateBucketItem;
  user: User | null;
  selectedGroupId: number | null;
};

export type TCreateBucketFolderParams = {
  folder: TCreateBucketFolder;
  user: User | null;
  selectedGroupId: number | null;
};
