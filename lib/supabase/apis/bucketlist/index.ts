import { supabase } from '@/lib/supabase/client';
import { TCreateBucketFolderParams, TCreateBucketItemParams } from '@/lib/supabase/apis/bucketlist/type';
import { BucketFolder, BucketItem } from '@/lib/supabase/type';

//Bucket Item
export const getBucketItems = async (folderId: number) => {
  const { data, error } = await supabase
    .from('bucket_items')
    .select('*')
    .order('created_time', { ascending: true })
    .eq('bucket_folder_id', folderId);
  if (error) throw new Error(error.message);
  return data;
};

export const createBucketItem = async (params: TCreateBucketItemParams) => {
  const { item, user, selectedGroupId } = params;

  if (!user || !selectedGroupId) throw new Error('user or selectedGroupId is null');

  const { error } = await supabase
    .from('bucket_items')
    .insert({ ...item, creator_id: user.id, group_id: selectedGroupId });

  if (error) throw new Error(error.message);
  return;
};

export const updateBucketItem = async (bucketItem: BucketItem) => {
  const { error } = await supabase.from('bucket_items').update({ title: bucketItem.title }).eq('id', bucketItem.id);
  if (error) throw new Error(error.message);
  return;
};

export const deleteBucketItem = async (id: number) => {
  const { error } = await supabase.from('bucket_items').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return;
};

export const completeBucketItem = async (id: number) => {
  const { error } = await supabase.from('bucket_items').update({ completed: true }).eq('id', id);
  if (error) throw new Error(error.message);
  return;
};

//Bucket Folder
export const getBucketFolders = async (groupId: number) => {
  const { data, error } = await supabase
    .from('bucket_folders')
    .select('*')
    .order('created_time', { ascending: true })
    .eq('group_id', groupId);
  if (error) throw new Error(error.message);
  return data;
};

export const createBucketFolder = async (params: TCreateBucketFolderParams) => {
  const { folder, user, selectedGroupId } = params;

  if (!user || !selectedGroupId) throw new Error('user or selectedGroupId is null');

  const { error } = await supabase
    .from('bucket_folders')
    .insert({ ...folder, creator_id: user.id, group_id: selectedGroupId });
  if (error) throw new Error(error.message);
  return;
};

export const updateBucketFolder = async (bucketFolder: BucketFolder) => {
  const { error } = await supabase
    .from('bucket_folders')
    .update({ title: bucketFolder.title })
    .eq('id', bucketFolder.id);

  if (error) throw new Error(error.message);
  return;
};

export const deleteBucketFolder = async (id: number) => {
  const { error } = await supabase.from('bucket_folders').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return;
};