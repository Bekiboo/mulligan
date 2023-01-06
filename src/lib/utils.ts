// function to get the middle of height and width of an element
export function getMiddleOfElement(element: HTMLElement) {
	const { height, width } = element.getBoundingClientRect()
	return {
		middleX: width / 2,
		middleY: height / 2
	}
}


// function to get cursor position
export function getCursorPosition(event: MouseEvent) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}