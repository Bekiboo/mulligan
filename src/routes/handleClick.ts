import type { Element } from '$lib/types';

export function addToken(event: any, elementList: Element[]) {
	elementList = [
		...elementList,
		{
			id: Math.round(Math.random() * 1000000).toString(),
			pos: {
				x: event.layerX,
				y: event.layerY,
				z: Math.round(Math.random() * 1000000)
			},
			owner: 'test',
			type: 'token',
			color: 'red',
			size: 50
		}
	];

	return elementList;
}
