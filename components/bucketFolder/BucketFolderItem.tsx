import React from 'react';
import { BucketFolder } from '@/lib/supabase/type';
import Link from 'next/link';

const BucketFolderItem = ({ folder }: { folder: BucketFolder }) => {
  return (
    <li key={folder.id}>
      <Link href={`/bucketlist/${folder.id}`}>
        <a>{folder.title}</a>
      </Link>
    </li>
  );
};

export default BucketFolderItem;
