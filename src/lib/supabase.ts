import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string;
  technologies: string[];
  demo_url?: string;
  image_url?: string;
  order_index: number;
  created_at: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  order_index: number;
  created_at: string;
}

export interface Hobby {
  id: string;
  title: string;
  content: string;
  images: string[];
  order_index: number;
  created_at: string;
}
