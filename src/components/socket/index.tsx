import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://192.168.29.218:3000";

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, // important for Next.js
});
export default socket;
