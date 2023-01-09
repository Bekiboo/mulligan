import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit'


export const load = (async () => {
    // TODO: create error page telling "no game with that ID exists"
    throw redirect(303, '/signin')
}
) satisfies PageLoad;
