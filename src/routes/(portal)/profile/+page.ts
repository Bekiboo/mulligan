import { supabase } from '$lib/db/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';



export const load = (async (event) => {
    
    const { session } = await getSupabase(event)
   
    const { data, error } = await supabase
        .from('game')
        .select('*')
        .eq('owner', session?.user.id)
        
		if (error) {
			console.log('Error loading Games: ' + error);
            
		}
		return {
                user: session?.user || null,
                games: data
            }
}
) satisfies PageLoad;
