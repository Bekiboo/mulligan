import type { BrdElem, Position } from '$lib/types'
import type { SupabaseClient } from '@supabase/supabase-js'

export async function updateBrdElemPos(supabase: SupabaseClient, brdElem: BrdElem): Promise<void> {
	// TODO: check if the brdElem is owned by the user
	// Note: can update all brdElems at once with UPSERT, but might lead into bugs
	const { error } = await supabase.from('element').update({ pos: brdElem.pos }).eq('id', brdElem.id)

	if (error) console.log(error)
}

export async function createBrdElem(
	supabase: SupabaseClient,
	type: string,
	gameSlug: string,
	owner: string,
	x: number,
	y: number
): Promise<void> {
	const pos: Position = {
		x,
		y,
		z: Math.round(Math.random() * 1000000)
	}
	let propty: Record<string, unknown> = {}

	switch (type) {
		case 'token':
			propty = {
				// size: (brdElem as Token).size,
				// color: (brdElem as Token).color
			}
			break
		case 'card':
			propty = {
				// title: (brdElem as Card).title,
				// description: (brdElem as Card).description
			}
			break
		case 'note':
			propty = {
				// text: (brdElem as Note).text
			}
			break
	}

	if (owner === '') {
		console.log('No user logged in')
		return
	}
	const { error } = await supabase.from('element').insert({
		game_slug: gameSlug,
		type,
		owner,
		pos,
		propty,
		shared: false
	})

	if (error) console.log(error)
}

export async function deleteBrdElem(supabase: SupabaseClient, brdElems: BrdElem[]): Promise<void> {
	const ids = brdElems.map((brdElem) => brdElem.id)
	const { error } = await supabase.from('element').delete().in('id', ids)

	if (error) {
		console.log(error)
		// add back the brdElem to the list if there was an error
		// TOFIX: this is not working yet
		// brdElemList?.update((brdElems: BrdElem[]) => [...brdElems, { brdElems }])
	}
}
