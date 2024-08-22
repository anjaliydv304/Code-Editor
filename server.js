const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const ACTIONS = require('./src/Action');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        const rooms = Object.keys(socket.rooms);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            const clients = getAllConnectedClients(roomId);
            clients.forEach(({ socketId }) => {
                io.to(socketId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[socket.id],
                });
            });
        });
        delete userSocketMap[socket.id];
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
