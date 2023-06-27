const { Server } = require("socket.io");

const onlineUsers = []
let io

exports.addOnlineUser = (userId) => {
    console.log("addOnlineUser called")
    if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId)
        io.emit("get online users", onlineUsers)
    }
}
exports.removeOnlineUser = (userId) => {
    const index = onlineUsers.indexOf(userId);

    if (index > -1) {
        onlineUsers.splice(index, 1);
        io.emit("get online users", onlineUsers)
    }
}
exports.sendMessage = (convId, mess) => {
    io.to(`conversation:${convId}`).emit("get message", mess)
}

exports.createSocketSever = (server) => {
    io = new Server(server, {
        cors: {
            origin: true,
            credentials: true
        }
    })
    io.on("connection", (socket) => {
        console.log("A socket connected")
        // socket.on("add online", (userId) => {
        //     console.log("socket: add online")
        //     onlineUsers = [...onlineUsers, userId]
        //     socket.broadcast.emit("get online users", onlineUsers)
        // })
        socket.on("get online users", () => {
            socket.emit("get online users", onlineUsers)
        })

        socket.on("open conversation", (convId) => {
            socket.join(`conversation:${convId}`)
            console.log("socket joined conversation")
            console.log("Socket rooms: ", socket.rooms)
        })
        socket.on("close conversation", (convId) => {
            socket.leave(`conversation:${convId}`)
            console.log(`leave ${convId}`)
        })
    });
    return io
}