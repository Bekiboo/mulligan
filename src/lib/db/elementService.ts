import { supabase } from '$lib/db/supabase'
import { user } from '$lib/stores/auth'
import { elementList } from '$lib/stores/elements'
import type { Card, Element, Note, Position, Token, User } from '$lib/types'

export async function updateElementPos(element: Element): Promise<void> {
	const { error } = await supabase.from('element').update({ pos: element.pos }).eq('id', element.id)

	if (error) console.log(error)
}

export async function createElement(
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
	let propty: any

	switch (type) {
		case 'token':
			propty = {
				// size: (element as Token).size,
				// color: (element as Token).color
			}
			break
		case 'card':
			propty = {
				// title: (element as Card).title,
				// description: (element as Card).description
			}
			break
		case 'note':
			propty = {
				// text: (element as Note).text
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
		is_shared: false
	})

	if (error) console.log(error)
}

export async function deleteElement(element: Element): Promise<void> {
	const { error } = await supabase.from('element').delete().eq('id', element.id)

	if (error) {
		console.log(error)
		// add back the element to the list
		// TODO: this is not working yet
		elementList?.update((elements: any) => [...elements, { element }])
	}
}
