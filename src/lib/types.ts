export type BrdElem = Token | Card | Note

export type BaseBrdElem = {
	game_slug: string
	pos: Position
	owner: string
	id: string
	shared: boolean
	pinned: boolean
	visible: boolean
	on_background: boolean
}

export type Token = BaseBrdElem & {
	type: 'token'
	color: string
	size: number
}

export type Card = BaseBrdElem & {
	type: 'card'
	title: string
	description: string
}

export type Note = BaseBrdElem & {
	type: 'note'
	text: string
}

export type Position = {
	x: number
	y: number
	z: number
}

// export type BoardStateMessage = {
// 	type: 'boardState'
// 	brdElems: BrdElem[]
// }

export type User = {
	id: string
	email: string
}

export type FormError = {
	email?: string
	password?: string
	confirmPassword?: string
	passwordNotMatching?: boolean
}
