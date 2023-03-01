import { isNonNullable, pickFirst } from '@/utils/array';
import { supabase } from '../client';
import { User } from '../type';

export const getMemberListByGroupId = async (group_id: number) => {
  const { data, error } = await supabase
    .from('group_members')
    // @note: `users!group_members_user_id_fkey`
    // => users 테이블 조회시 group_members의 어떤 값을 외래키로 쓸건지 선언
    .select(`*, users!group_members_user_id_fkey (*)`)
    .eq('group_id', group_id)
    .order('joined_time', { ascending: true });

  const memberList: User[] = (data ?? []).map((item) => pickFirst(item.users)).filter(isNonNullable);

  if (error) throw error;
  return memberList;
};
