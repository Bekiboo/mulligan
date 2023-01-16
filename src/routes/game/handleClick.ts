import { supabase } from '$lib/db/supabase'
import { user } from '$lib/stores/auth'
import type { Card, Element, Note, Position, Token, User } from '$lib/types'

// export function addToken(event: any, elementList: Element[]) {

const elementRef = supabase.from('element')



export async function createElement(
	event: any,
	type: string,
	gameSlug: string,
	owner: string
): Promise<void> {
    
	const pos: Position = {
		x: event.layerX,
		y: event.layerY,
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
	await elementRef.insert({
		game_slug: gameSlug,
		type,
		owner,
		pos,
		propty,
		is_shared: false
	})
}
