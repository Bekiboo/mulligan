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


export function genRandomString(length: number) {
   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const charLength = chars.length;
   let result = '';
   for ( let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}