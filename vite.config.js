import { sveltekit } from '@sveltejs/kit/vite';
// import { Server } from 'socket.io';

// export const webSocketServer = {
// 	name: 'webSocketServer',
// 	configureServer(server) {
// 		const io = new Server(server.httpServer);

// 		io.on('connection', (socket) => {
// 			socket.emit('eventFromServer', 'Hello, World 👋');
// 			socket.on('eventFromClient', (data) => {
// 				console.log(data);
// 			});

// 			socket.on('request-board-state', (msg) => {
// 				console.log('PROUT');
// 			});

// 			// socket.on('board-state', (msg) => {
// 			// 	console.log('Receiving: ' + JSON.stringify(msg));

// 			// 	socket.broadcast.emit('board-state', msg);
// 			// 	// Other fields...
// 			// });
// 		});
// 	}
// };

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
};

export default config;
