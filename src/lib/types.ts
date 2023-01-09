export type Element = Token | Card | Note;

export type BaseElement = {
	game_slug: string;
	pos: Position;
	owner: string;
};

export type Token = BaseElement & {
	type: 'token';
	color: string;
	size: number;
};

export type Card = BaseElement & {
	type: 'card';
	title: string;
	description: string;
};

export type Note = BaseElement & {
	type: 'note';
	text: string;
};

export type Position = {
	x: number;
	y: number;
	z: number;
};

export type BoardStateMessage = {
	type: 'boardState';
	elements: Element[];
};

export type User = {
	id: string;
	email: string;
}