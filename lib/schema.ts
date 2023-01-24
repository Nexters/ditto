/* eslint-disable no-unused-vars */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_time: string | null;
          creator_id: number;
          group_id: number;
          id: number;
          title: string;
        };
        Insert: {
          created_time?: string | null;
          creator_id: number;
          group_id: number;
          id?: number;
          title: string;
        };
        Update: {
          created_time?: string | null;
          creator_id?: number;
          group_id?: number;
          id?: number;
          title?: string;
        };
      };
      events: {
        Row: {
          created_time: string | null;
          creator_id: number;
          description: string | null;
          end_time: string;
          group_id: number;
          id: number;
          is_all_day: boolean | null;
          is_annual: boolean | null;
          start_time: string;
          title: string;
        };
        Insert: {
          created_time?: string | null;
          creator_id: number;
          description?: string | null;
          end_time: string;
          group_id: number;
          id?: number;
          is_all_day?: boolean | null;
          is_annual?: boolean | null;
          start_time: string;
          title: string;
        };
        Update: {
          created_time?: string | null;
          creator_id?: number;
          description?: string | null;
          end_time?: string;
          group_id?: number;
          id?: number;
          is_all_day?: boolean | null;
          is_annual?: boolean | null;
          start_time?: string;
          title?: string;
        };
      };
      group_members: {
        Row: {
          group_id: number;
          joined_by: number | null;
          joined_time: string | null;
          user_id: number;
        };
        Insert: {
          group_id: number;
          joined_by?: number | null;
          joined_time?: string | null;
          user_id: number;
        };
        Update: {
          group_id?: number;
          joined_by?: number | null;
          joined_time?: string | null;
          user_id?: number;
        };
      };
      groups: {
        Row: {
          created_time: string | null;
          id: number;
          name: string;
          owner_id: number | null;
        };
        Insert: {
          created_time?: string | null;
          id?: number;
          name: string;
          owner_id?: number | null;
        };
        Update: {
          created_time?: string | null;
          id?: number;
          name?: string;
          owner_id?: number | null;
        };
      };
      invitations: {
        Row: {
          code: string;
          created_time: string | null;
          creator_id: number;
          group_id: number;
        };
        Insert: {
          code: string;
          created_time?: string | null;
          creator_id: number;
          group_id: number;
        };
        Update: {
          code?: string;
          created_time?: string | null;
          creator_id?: number;
          group_id?: number;
        };
      };
      tasks: {
        Row: {
          categories_id: number;
          created_time: string | null;
          creator_id: number;
          description: string | null;
          group_id: number;
          id: number;
          title: string;
        };
        Insert: {
          categories_id: number;
          created_time?: string | null;
          creator_id: number;
          description?: string | null;
          group_id: number;
          id?: number;
          title: string;
        };
        Update: {
          categories_id?: number;
          created_time?: string | null;
          creator_id?: number;
          description?: string | null;
          group_id?: number;
          id?: number;
          title?: string;
        };
      };
      users: {
        Row: {
          created_time: string;
          id: number;
          nickname: string;
          oauth_id: string;
          profile_image: string | null;
        };
        Insert: {
          created_time?: string;
          id?: number;
          nickname: string;
          oauth_id: string;
          profile_image?: string | null;
        };
        Update: {
          created_time?: string;
          id?: number;
          nickname?: string;
          oauth_id?: string;
          profile_image?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
