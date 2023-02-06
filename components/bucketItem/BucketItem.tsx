import { BucketItem as TBucketItem } from '@/lib/supabase/type';

const BucketItem = ({ item }: { item: TBucketItem }) => {
  return <li>{item.title}</li>;
};

export default BucketItem;
