import { getSupabase } from '@supabase/auth-helpers-sveltekit'
// import type { PageLoad } from './$types';

// In addition you can create a layout load function if you are using 
// invalidate('supabase:auth'):
export const load =  (async (event: any) => {
  const { session } = await getSupabase(event)
  return { session }
})