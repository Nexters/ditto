export interface BucketFolder {
  created_time: string;
  creator_id: number;
  group_id: number;
  id: number;
  title: string;
}

export interface BucketItem {
  bucket_folder_id: number;
  created_time: string;
  creator_id: number;
  description: string | null;
  group_id: number;
  id: number;
  title: string;
  completed: boolean;
}
