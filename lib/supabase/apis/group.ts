import { isNonNullable, pickFirst } from '@/utils/array';
import { supabase } from '../client';

export const createGroup = async (user_id: number, group_name: string) => {
  const { data, error } = await supabase.from('groups').insert({ owner_id: user_id, name: group_name }).select();
  const group = data?.[0];
  if (!group || error) throw error;
  return group;
};

export const joinGroup = async (user_id: number, group_id: number, joined_by?: number) => {
  const { error } = await supabase.from('group_members').insert({
    group_id,
    user_id,
    joined_by,
  });
  if (error) throw error;
  return;
};

export const createDefaultBucketFolder = async (user_id: number, group_id: number) => {
  const { error } = await supabase.from('bucket_folders').insert([
    {
      creator_id: user_id,
      group_id,
      title: '가고 싶은 곳',
    },
    {
      creator_id: user_id,
      group_id,
      title: '먹고 싶은 음식',
    },
  ]);
  if (error) throw error;
  return;
};

export const getJoinedGroupList = async (user_id: number) => {
  const { data, error } = await supabase
    .from('group_members')
    .select(`*, groups (*)`)
    .eq('user_id', user_id)
    .order('joined_time', { ascending: true });
  const joinedGroupList = (data ?? []).map((item) => pickFirst(item.groups)).filter(isNonNullable);
  if (error) throw error;
  return joinedGroupList;
};
