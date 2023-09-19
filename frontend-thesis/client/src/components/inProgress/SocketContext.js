import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const sendMessage = () => {
    socket.emit("send_message", { message: "hello" })
}