import { supabase } from '@/lib/supabase/client';
import { ICreateBucketFolderParams, ICreateBucketItemParams } from '@/lib/supabase/apis/bucketlist/type';
import { BucketFolder, BucketItem } from '@/lib/supabase/type';

//Bucket Item
export const createBucketItem = async (params: ICreateBucketItemParams) => {
  const { item, user, selectedGroupId } = params;

  if (!user || !selectedGroupId) throw new Error('user or selectedGroupId is null');

  const { data, error } = await supabase
    .from('bucket_items')
    .insert({ ...item, creator_id: user.id, group_id: selectedGroupId })
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateBucketItem = async (bucketItem: BucketItem) => {
  const { data, error } = await supabase
    .from('bucket_items')
    .update({ title: bucketItem.title })
    .eq('id', bucketItem.id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteBucketItem = async (id: number) => {
  const { data, error } = await supabase.from('bucket_items').delete().eq('id', id).select();
  if (error) throw new Error(error.message);
  return data;
};

export const completeBucketItem = async (id: number) => {
  const { data, error } = await supabase.from('bucket_items').update({ completed: true }).eq('id', id).select();
  if (error) throw new Error(error.message);
  return data;
};

//Bucket Folder
export const createBucketFolder = async (params: ICreateBucketFolderParams) => {
  const { folder, user, selectedGroupId } = params;

  if (!user || !selectedGroupId) throw new Error('user or selectedGroupId is null');

  const { data, error } = await supabase
    .from('bucket_folders')
    .insert({ ...folder, creator_id: user.id, group_id: selectedGroupId })
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const updateBucketFolder = async (bucketFolder: BucketFolder) => {
  const { data, error } = await supabase
    .from('bucket_folders')
    .update({ title: bucketFolder.title })
    .eq('id', bucketFolder.id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteBucketFolder = async (id: number) => {
  const { data, error } = await supabase.from('bucket_folders').delete().eq('id', id).select();
  if (error) throw new Error(error.message);
  return data;
};
