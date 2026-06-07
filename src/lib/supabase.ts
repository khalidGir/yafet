import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const baseUrl = new URL(supabaseUrl);
const cleanUrl = baseUrl.origin;

export const supabase = createClient(cleanUrl, supabaseAnonKey);
