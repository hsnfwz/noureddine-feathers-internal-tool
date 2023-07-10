import { createClient } from '@supabase/supabase-js';

// env
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl: string = PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;