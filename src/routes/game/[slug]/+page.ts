import { supabase } from '$lib/db/supabase'
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const { slug } = params

  const { data, error } = await supabase
    .from(`element`)
    .select()
    .eq('game_slug', slug)
    
    const elements: Element[] = data as Element[];

    if (error)  console.error('Error while loading elements: ' + error)

    return {
      game: elements,
      slug
    }
  
}
) satisfies PageLoad;
