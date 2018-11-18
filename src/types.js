// @flow

export interface RantUpdate {
  id: number;
  rant_id: number;
  created_at: string;
  updated_at: string;
  body: string;
}

export interface Rant {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  background: string;
  updates: RantUpdate[];
}
