import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ehsisktqnlepwzuiwtbq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2lza3RxbmxlcHd6dWl3dGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTA2OTEsImV4cCI6MjA2MjAyNjY5MX0.eizSDlPAQHSlCkvj5Jkgo1c_X49QtdtvhCHSf14qBxk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
