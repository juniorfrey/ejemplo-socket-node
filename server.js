const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"]
    }
  });

// Ruta para cargar el HTML
/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}) */;

// Manejar conexión de sockets
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Enviar el ID del usuario al cliente
    socket.emit('user_id', socket.id);

    // Manejar desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
