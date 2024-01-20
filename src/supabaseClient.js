import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ydnohgpqadmezwmnkrjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkbm9oZ3BxYWRtZXp3bW5rcmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3MTMzMDUsImV4cCI6MjAyMTI4OTMwNX0.MKVaJtoQZAZDoLEMOayKeMmJ0WwvmtcwL0lthp-DPDg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
