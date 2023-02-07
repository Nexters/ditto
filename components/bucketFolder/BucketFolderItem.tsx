import React from 'react';
import { BucketFolder } from '@/lib/supabase/type';
import Link from 'next/link';

const BucketFolderItem = ({ folder }: { folder: BucketFolder }) => {
  return (
    <li key={folder.id}>
      <Link href={`/bucketlist/${folder.id}`}>{folder.title}</Link>
    </li>
  );
};

export default BucketFolderItem;
