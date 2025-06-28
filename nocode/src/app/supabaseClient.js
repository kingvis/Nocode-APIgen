import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tdjhewmqnvnxrjsalffg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkamhld21xbnZueHJqc2FsZmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjU1ODYsImV4cCI6MjA2NjM0MTU4Nn0.sCEAlyPoGB6cq0bEXsWvzg4voTo_3MI_XgundW1GjGA';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 