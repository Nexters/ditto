export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      bucket_folders: {
        Row: {
          created_time: string;
          creator_id: number;
          group_id: number;
          id: number;
          title: string;
        };
        Insert: {
          created_time?: string;
          creator_id: number;
          group_id: number;
          id?: number;
          title: string;
        };
        Update: {
          created_time?: string;
          creator_id?: number;
          group_id?: number;
          id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bucket_folders_creator_id_fkey';
            columns: ['creator_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bucket_folders_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
      bucket_items: {
        Row: {
          bucket_folder_id: number;
          completed: boolean;
          created_time: string;
          creator_id: number;
          description: string | null;
          group_id: number;
          id: number;
          title: string;
        };
        Insert: {
          bucket_folder_id: number;
          completed?: boolean;
          created_time?: string;
          creator_id: number;
          description?: string | null;
          group_id: number;
          id?: number;
          title: string;
        };
        Update: {
          bucket_folder_id?: number;
          completed?: boolean;
          created_time?: string;
          creator_id?: number;
          description?: string | null;
          group_id?: number;
          id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bucket_items_bucket_folder_id_fkey';
            columns: ['bucket_folder_id'];
            referencedRelation: 'bucket_folders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bucket_items_creator_id_fkey';
            columns: ['creator_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bucket_items_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
      events: {
        Row: {
          created_time: string;
          creator_id: number;
          description: string | null;
          end_time: string;
          group_id: number;
          id: number;
          is_all_day: boolean | null;
          is_annual: boolean | null;
          sequence: number;
          start_time: string;
          title: string;
          updated_time: string | null;
        };
        Insert: {
          created_time?: string;
          creator_id: number;
          description?: string | null;
          end_time: string;
          group_id: number;
          id?: number;
          is_all_day?: boolean | null;
          is_annual?: boolean | null;
          sequence?: number;
          start_time: string;
          title: string;
          updated_time?: string | null;
        };
        Update: {
          created_time?: string;
          creator_id?: number;
          description?: string | null;
          end_time?: string;
          group_id?: number;
          id?: number;
          is_all_day?: boolean | null;
          is_annual?: boolean | null;
          sequence?: number;
          start_time?: string;
          title?: string;
          updated_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'events_creator_id_fkey';
            columns: ['creator_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
      fcm_tokens: {
        Row: {
          created_time: string;
          last_used_time: string | null;
          token: string;
          user_id: number;
        };
        Insert: {
          created_time?: string;
          last_used_time?: string | null;
          token: string;
          user_id: number;
        };
        Update: {
          created_time?: string;
          last_used_time?: string | null;
          token?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fcm_tokens_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      group_members: {
        Row: {
          group_id: number;
          joined_by: number | null;
          joined_time: string;
          user_id: number;
        };
        Insert: {
          group_id: number;
          joined_by?: number | null;
          joined_time?: string;
          user_id: number;
        };
        Update: {
          group_id?: number;
          joined_by?: number | null;
          joined_time?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'group_members_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'group_members_joined_by_fkey';
            columns: ['joined_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'group_members_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      groups: {
        Row: {
          created_time: string;
          id: number;
          is_opened_events: boolean;
          name: string;
          owner_id: number | null;
          uid: string;
        };
        Insert: {
          created_time?: string;
          id?: number;
          is_opened_events?: boolean;
          name: string;
          owner_id?: number | null;
          uid?: string;
        };
        Update: {
          created_time?: string;
          id?: number;
          is_opened_events?: boolean;
          name?: string;
          owner_id?: number | null;
          uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_owner_id_fkey';
            columns: ['owner_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      invitations: {
        Row: {
          code: string;
          created_time: string;
          creator_id: number;
          group_id: number;
        };
        Insert: {
          code: string;
          created_time?: string;
          creator_id: number;
          group_id: number;
        };
        Update: {
          code?: string;
          created_time?: string;
          creator_id?: number;
          group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'invitations_creator_id_fkey';
            columns: ['creator_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'invitations_group_id_fkey';
            columns: ['group_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_time: string;
          id: number;
          is_allowed_alarm: boolean | null;
          last_login_time: string | null;
          nickname: string;
          oauth_id: string;
          profile_image: string | null;
        };
        Insert: {
          created_time?: string;
          id?: number;
          is_allowed_alarm?: boolean | null;
          last_login_time?: string | null;
          nickname: string;
          oauth_id: string;
          profile_image?: string | null;
        };
        Update: {
          created_time?: string;
          id?: number;
          is_allowed_alarm?: boolean | null;
          last_login_time?: string | null;
          nickname?: string;
          oauth_id?: string;
          profile_image?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_group_tokens: {
        Args: {
          p_group_id: number;
          p_exclude_user_id: number;
        };
        Returns: {
          token: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
